---
layout: default
title: "OpenClaw - Z.AI Coding Plan統合ガイド"
parent: ドキュメント・翻訳
date: 2026-02-12
---

# OpenClaw - Z.AI Coding Plan統合ガイド

**作成日:** 2026-02-12
**タイプ:** ドキュメント翻訳
**元ソース:** [OpenClaw - Overview](https://docs.z.ai/devpack/tool/openclaw)

---

## 📝 概要

Z.AI Coding Planを使用したOpenClaw AIアシスタントとの統合に関する完全なガイドです。OpenClawは独自デバイスで動作するパーソナルAIアシスタントで、様々なメッセージングプラットフォームに接続できます。Z.AIのGLMモデルをZ.AI Coding Plan経由で使用するように構成できます。

---

## 📄 内容

## OpenClawのインストールと構成

（インストール手順の詳細は元ドキュメントを参照）

---

## 高度な構成

### モデルフェイルオーバー

信頼性を確保するためにモデルフェイルオーバーを設定します。

**.openclaw/openclaw.json**
```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "zai/glm-4.7",
        "fallbacks": ["zai/glm-4.7-flash"]
      }
    }
  }
}
```

### ClawHubによるスキル

スキルは単なるSKILL.mdファイルを含むフォルダです。OpenClawエージェントに新しい機能を追加したい場合、[ClawHub](https://clawhub.ai/)がスキルを見つけてインストールする最も簡単な方法です。

#### clawhubのインストール

```bash
npm i -g clawhub
```

#### スキルの管理

スキルを検索
```bash
clawhub search "postgres backups"
```

新しいスキルをダウンロード
```bash
clawhub install my-skill-pack
```

インストール済みスキルを更新
```bash
clawhub update --all
```

### プラグイン

プラグインは追加機能（コマンド、ツール、Gateway RPC）でOpenClawを拡張する小さなコードモジュールです。

現在読み込まれているものを確認
```bash
openclaw plugins list
```

公式プラグインをインストール（例: Voice Call）
```bash
openclaw plugins install @openclaw/voice-call
```

Gatewayを再起動
```bash
openclaw gateway restart
```

---

## 💡 ベストプラクティス

### モデル選択のガイド

Z.AI GLMモデルの使い分け：

| モデル | 特徴 | 使用シーン |
|--------|------|------------|
| `zai/glm-4.7` | 高品質・高精度 | 複雑なコードレビュー、長いドキュメント作成、クリティカルなタスク |
| `zai/glm-4.7-flash` | 高速・低コスト | クイック質問、簡単なコード補完、反復的なタスク |

**推奨設定:** glm-4.7をプライマリに、glm-4.7-flashをフォールバックに設定することで、コストと品質のバランスをとれます。

### セキュリティ設定

**APIキー管理:**
```bash
# 環境変数での設定（推奨）
export ZAI_API_KEY="your-api-key-here"

# ~/.zshrc または ~/.bashrc に追加して永続化
echo 'export ZAI_API_KEY="your-api-key-here"' >> ~/.zshrc
```

**アクセス制御の例:**
```json
{
  "channels": {
    "whatsapp": {
      "allowFrom": ["+8190xxxxxxxx"],  // 自分の番号のみ許可
      "groups": {
        "*": {
          "requireMention": true  // グループではメンション時のみ応答
        }
      }
    }
  },
  "messages": {
    "groupChat": {
      "mentionPatterns": ["@openclaw", "@ai"]  // メンションパターン
    }
  }
}
```

### パフォーマンス最適化

1. **フェイルオーバー設定:** 高負荷時は自動的にflashモデルに切り替え
2. **キャッシュ活用:** セッションを維持してAPI呼び出しを減らす
3. **プラグイン整理:** 使用していないプラグインを削除してリソース節約

---

## 🚀 実践的な使用例

### 開発ワークフローでの活用

**コードレビュー:**
```
「この関数の可読性を改善して」
「このコードのバグを見つけて」
```

**ドキュメント作成:**
```
「このREADME.mdの日本語訳を作成して」
「API仕様書をMarkdownで作成して」
```

**デバッグ:**
```
「このエラーメッセージの原因を調べて」
「ログファイルから異常を検出して」
```

### 日常的な使い方

- **情報収集:** 「最新のJavaScriptトレンドを教えて」
- **翻訳:** 「この英文メールを日本語にして」
- **要約:** 「この記事を3行で要約して」
- **アイデア出し:** 「新しいウェブサービスのアイデアを5つ出して」

---

## 🔧 詳細なトラブルシューティング

### 一般的な問題

- **APIキー認証**

  Z.AI APIキーが有効でGLM Coding Planを持っていることを確認してください

  - 環境変数でAPIキーが正しく設定されているか確認してください
  - APIキーにGLM Coding Planの権限が含まれているか確認してください

- **モデルの可用性**

  GLMモデルがあなたの地域で利用可能であることを確認してください

  - モデル名の形式を確認してください（zai/glm-4.7であるべきです）
  - [Z.AIモデルリスト](https://docs.z.ai/models)で最新情報を確認してください

- **接続の問題**

  OpenClaw gatewayが実行されていることを確認してください

  - Z.AIエンドポイントへのネットワーク接続を確認してください
  - `openclaw gateway status` でステータスを確認してください

### よくあるエラーと対処法

| エラー | 原因 | 対処法 |
|--------|------|--------|
| `API key invalid` | APIキーが間違っている、または期限切れ | 環境変数`ZAI_API_KEY`を再設定 |
| `Model not found` | モデル名が間違っている、または利用不可 | モデル名を`zai/glm-4.7`に修正 |
| `Connection timeout` | ネットワーク問題、ファイアウォール | Z.AIエンドポイントへの接続を確認 |
| `Rate limit exceeded` | API使用量上限超過 | フェイルオーバー設定を活用 |

### デバッグモードの有効化

詳細なログを確認したい場合：
```json
{
  "logging": {
    "level": "debug"
  }
}
```

---

## 📎 参考リンク

- [元ドキュメント](https://docs.z.ai/devpack/tool/openclaw)
- [OpenClawドキュメント](https://docs.openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [Z.AI開発者ドキュメント](https://docs.z.ai/)
- [コミュニティスキル](https://github.com/VoltAgent/awesome-openclaw-skills)
