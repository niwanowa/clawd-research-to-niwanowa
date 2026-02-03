---
layout: default
title: "RobotMon - Android 自動化ツール調査"
parent: Research
date: 2026-02-03
---

# RobotMon - Android 自動化ツール調査

**作成日:** 2026-02-03
**タイプ:** 技術調査
**元ソース:**
- [Develop Guide](https://www.robotmon.app/shi-yong/develop-guide)
- [GitHub: robotmon-scripts](https://github.com/r2-studio/robotmon-scripts)

---

## 📝 概要

RobotMonは、Androidデバイス上でJavaScriptを実行してゲームやアプリを自動化するツールです。スクリーンショット、タッチ操作、OpenCVによる画像認識、HTTP通信など、豊富なAPIを提供しています。

---

## 🎯 どんなプロダクトか

### 主な特徴

1. **JavaScriptベースの自動化**
   - ES5準拠のJavaScriptでスクリプトを記述
   - Androidシステム上で直接実行
   - `adb shell` と同等の権限を持つ

2. **豊富な画像処理機能（OpenCV）**
   - スクリーンショット取得・保存
   - テンプレートマッチング（画像検索）
   - 色抽出・フィルタリング
   - 輪郭検出、円検出、エッジ検出

3. **操作シミュレーション**
   - タップ（`tap`）、スワイプ（`swipe`）
   - キーコード送信（`keycode`）
   - 文字入力（`typing`）

4. **WebビューによるUI**
   - HTML/CSS/JavaScriptでカスタムUIを構築
   - フローティングウィンドウで制御
   - 設定画面、ログ表示などを自在に作成可能

5. **解像度自動対応（RBMライブラリ）**
   - 開発者環境とユーザー環境の解像度差を自動調整
   - 画像の自動リサイズ・圧縮
   - 座標の自動スケーリング

6. **gRPC API**
   - 外部からRobotMonサービスにアクセス可能
   - スクリプト実行、スクリーンショット、ログ取得など

### アーキテクチャ

```
┌─────────────────┐
│  Developer IDE  │  (デスクトップアプリ)
│                 │
│  - スクリプト編集  │
│  - 実行/停止      │
│  - ログ表示      │
│  - スクリーン同期 │
└────────┬─────────┘
         │ USB / Wi-Fi
         │ gRPC
┌────────▼─────────┐
│  Android Device  │
│  ┌─────────────┐ │
│  │ Robotmon    │ │
│  │ Service     │ │
│  └──────┬──────┘ │
│         │         │
│    ┌────▼─────┐  │
│    │  index.js │  │ ← JavaScriptスクリプト
│    │  index.html│ │ ← WebビューUI
│    └──────────┘  │
└──────────────────┘
```

---

## ⚙️ 導入に必要なこと

### 1. 必要なコンポーネント

| コンポーネント | 説明 |
|--------------|------|
| **Robotmon アプリ** | Androidデバイスにインストール |
| **Developer IDE** | デスクトップアプリ（Mac/Windows/Linux） |
| **Androidデバイス** | Root権限なしでも動作可 |
| **ADB接続** | USBまたはWi-Fi経由でデバイスと通信 |

### 2. インストール手順

#### Step 1: Android アプリのインストール

1. RobotmonアプリをGoogle PlayまたはAPKからインストール
2. アプリを起動し、IPアドレスを確認

#### Step 2: Developer IDE のインストール

1. IDEをダウンロードして解凍
2. Macの場合: Applicationsフォルダに移動
3. アプリを起動

#### Step 3: デバイス接続

**USB接続の場合:**
- 普通に接続するだけでIDEが自動検出

**エミュレータの場合:**
```bash
adb forward tcp:8081 tcp:8081
# 127.0.0.1で接続
```

**Wi-Fi接続の場合:**
- RobotmonアプリでIPアドレスを確認
- IDEでIPアドレスを手動追加

### 3. 最初のスクリプト作成

**index.js:**
```javascript
function start() {
    console.log('Hello, RobotMon!');
    tap(500, 500, 10); // (500, 500)をタップ
}

function stop() {
    console.log('Stopped');
}
```

**index.html:**
```html
<html>
<script>
function onEvent(eventType) {
    if (eventType == 'OnPlayClick') {
        JavaScriptInterface.runScript('start();');
    } else if (eventType == 'OnPauseClick') {
        JavaScriptInterface.runScript('stop();');
    }
}
function onLog(message) {
    console.log(message);
}
</script>
<body>
    <div>RobotMon スクリプト</div>
    <button>設定</button>
</body>
</html>
```

---

## 📚 API概要

### JavaScript Raw APIs

| カテゴリ | API | 説明 |
|---------|-----|------|
| **画面操作** | `getScreenSize()` | 画面サイズ取得 |
| | `getScreenshot()` | スクリーンショット取得 |
| | `tap(x, y, during)` | タップ |
| | `swipe(x1, y1, x2, y2, during)` | スワイプ |
| | `keycode(label, during)` | キーコード送信 |
| | `typing(words, during)` | 文字入力 |
| **システム** | `execute(command)` | システムコマンド実行 |
| | `sleep(ms)` | スリープ |
| | `getStoragePath()` | Robotmonフォルダパス |
| **ファイルI/O** | `readFile(path)` | ファイル読み込み |
| | `writeFile(path, text)` | ファイル書き込み |
| | `saveImage(img, path)` | 画像保存 |
| | `openImage(path)` | 画像読み込み |
| **HTTP** | `httpClient(method, url, body, headers)` | HTTPリクエスト |

### OpenCV APIs

| API | 説明 |
|-----|------|
| `clone(sourceImg)` | 画像複製 |
| `bgrToGray(sourceImg)` | グレースケール変換 |
| `threshold(sourceImg, thr, maxThr, code)` | 二値化 |
| `inRange(sourceImg, minB, minG, minR, minA, maxB, maxG, maxR, maxA)` | 色範囲抽出 |
| `findImage(sourceImg, targetImg)` | テンプレートマッチング |
| `findImages(sourceImg, targetImg, scoreLimit, resultCountLimit, withoutOverlap)` | 複数画像検索 |
| `getImageColor(sourceImg, x, y)` | 指定位置の色取得 |
| `cropImage(sourceImg, x, y, width, height)` | 画像切り抜き |
| `resizeImage(sourceImg, width, height)` | リサイズ |

### RBM Library（高レベルAPI）

```javascript
importJS('RBM-0.0.2');

var config = {
    appName: 'com.your.script',
    oriScreenWidth: 1080,      // 開発者の画面幅
    oriScreenHeight: 1920,     // 開発者の画面高さ
    oriVirtualButtonHeight: 0, // 仮想ボタン高さ（なければ0）
    oriResizeFactor: 0.6,      // スクリーンショットの圧縮率
    eventDelay: 200,           // イベント遅延(ms)
    imageThreshold: 0.85,      // 画像認識の閾値
    imageQuality: 80,          // 画質
    resizeFactor: 0.6,         // ユーザー環境の圧縮率
};

var rbm = new RBM(config);
rbm.init(); // 重要！start()内で呼ぶ

// 解像度自動対応で画像検索
rbm.findImage('startButton.png', 0.9);
rbm.imageClick('startButton.png', 0.9); // 見つかったらタップ
rbm.imageWaitClick('target.png', 5000, 0.9); // 待機してタップ
```

---

## 💡 記事としてあると嬉しそうなこと

### 入門レベル

1. **チュートリアル: 初めてのRobotMon**
   - インストールから最初の自動化までの手順
   - 簡単なゲーム自動化例（タップ連打など）
   - トラブルシューティング

2. **RBMライブラリ入門**
   - 解像度対応の仕組み
   - `oriResizeFactor`の設定方法
   - 複数解像度対応のベストプラクティス

### 中級レベル

3. **画像認識の基礎と応用**
   - `imageThreshold`の調整方法
   - 色ベースの認識 vs テンプレートマッチング
   - 部分一致と完全一致の使い分け
   - 画像のプリキャプチャによるパフォーマンス最適化

4. **WebビューUI開発**
   - フローティングウィンドウのカスタマイズ
   - 設定画面の作成例
   - ログ表示の改善
   - jQuery等の外部ライブラリ使用方法

5. **gRPC API活用**
   - 外部アプリとの連携方法
   - Node.js/Pythonからの制御例
   - リモート監視システムの構築

### 上級レベル

6. **高度な画像処理**
   - OpenCVフィルタ活用例（ぼかし、エッジ検出）
   - 輪郭検出によるオブジェクト認識
   - 複数条件の組み合わせ判定
   - 動的なテンプレート更新

7. **スクリプトの公開と共有**
   - GitHubへの公開手順
   - `script-config.json`の記述方法
   - PRの作り方
   - スクリプトのテスト方法

8. **パフォーマンス最適化**
   - スクリーンショットの頻度削減
   - `keepScreenshot()`の活用
   - メモリ管理（`releaseImage()`の重要性）
   - マルチスレッド処理の可能性

### 実践的例

9. **実践編: ゲーム自動化事例**
   - RPGの自動周回
   - パズルゲームの自動クリア
   - スマホゲームの放置プレイ

10. **実践編: アプリ操作自動化**
    - SNSの自動投稿
    - 通知の自動確認
    - 定期タスクの自動実行

### デプロイ・運用

11. **本番環境への導入**
    - 複数デバイスでの一括管理
    - 監視・通知システムの構築
    - トラブル時の自動復旧

12. **セキュリティ考慮事項**
    - Root権限なしでの限界
    - アカウントBANリスクへの対処
    - ログの保護

---

## 🔧 開発環境セットアップ

### 推奨環境

| 項目 | 推奨 |
|------|------|
| **OS** | Mac / Windows / Linux |
| **Androidバージョン** | 5.0+ |
| **Node.js** | (gRPC使用時) |
| **エディタ** | VS Code / Atom / 任意のテキストエディタ |

### プロジェクト構成

```
/sdcard/Robotmon/scripts/com.your.script/
├── index.js      # メインスクリプト
├── index.html    # WebビューUI
├── index.zip     # パッケージ（公開用）
└── images/       # 画像リソース
    ├── startButton.png
    └── target.png
```

---

## ⚠️ 注意点・制限事項

1. **ES5のみ**
   - ES6+の構文は使用不可
   - `const`, `let`, `=>` (アロー関数) などは使えない

2. **メモリ管理**
   - 画像ポインタは必ず `releaseImage()` で解放
   - 解放し忘れるとメモリリークに

3. **非同期処理**
   - `sleep()` は同期的なブロック
   - コールバック・Promiseは限定的

4. **開発環境の解像度**
   - RBMライブラリ使用時、開発者環境の解像度が基準になる
   - 変更するとスクリプト修正が必要

---

## 📎 参考リンク

- [Develop Guide](https://www.robotmon.app/shi-yong/develop-guide)
- [GitHub: robotmon-scripts](https://github.com/r2-studio/robotmon-scripts)
- [Robotmon 公式サイト](https://www.robotmon.app/)

---

## 📝 デプロイ時のレビューチェックリスト

デプロイ前に以下を確認：

- [ ] ES5構文を使用している（`const`/`let`/アロー関数なし）
- [ ] すべての画像ポインタに `releaseImage()` が呼ばれている
- [ ] RBMライブラリの解像度設定が正しい
- [ ] ユーザー環境での動作確認済み
- [ ] エラーハンドリングが実装されている
- [ ] ログ出力が十分
- [ ] `script-config.json` が正しく記述されている
- [ ] GitHubへのPRが作成可能な状態
