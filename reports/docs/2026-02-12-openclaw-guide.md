---
layout: default
title: "OpenClaw 統合ガイド翻訳"
parent: ドキュメント・翻訳
date: 2026-02-12
---

# OpenClaw 統合ガイド翻訳

**作成日:** 2026-02-12
**タイプ:** ドキュメント翻訳
**元ソース:** [OpenClaw Integration Guide](https://docs.z.ai/devpack/tool/openclaw)

---

## 📝 概要

Z.AI Coding Plan と OpenClaw AIアシスタントを統合する完全ガイドの日本語翻訳。OpenClawは独自のデバイスで実行され、様々なメッセージングプラットフォームに接続する個人用AIアシスタントです。Z.AIのGLMモデルをZ.AI Coding Planを通して使用するように設定できます。

---

## 📄 内容

# OpenClaw

Z.AI Coding Plan と OpenClaw AIアシスタントを統合する完全ガイド

OpenClawは独自のデバイスで実行され、様々なメッセージングプラットフォームに接続する個人用AIアシスタントです。Z.AI Coding Planを通してZ.AIのGLMモデルを使用するように設定できます。

---

## OpenClawのインストールと設定

### 1. APIキーの取得

- [Z.AI Open Platform](https://z.ai/model-api) にアクセスし、アカウント登録またはログインします。
- [API Keys](https://z.ai/manage-apikey/apikey-list) 管理ページでAPIキーを作成します。
- [GLM Coding Plan](https://z.ai/model-api/glm-coding-plan) に加入していることを確認します。

### 2. OpenClawのインストール

> **注意:** 詳細なインストールガイドについては、[公式ドキュメント](https://docs.openclaw.ai/install)を参照してください。

**前提条件:**
- [Node.js 22 以降](https://nodejs.org/en/download/)

OpenClawをインストールする最も簡単な方法は、公式インストーラースクリプトを使用することです：

**macOS/Linux:**
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows (PowerShell):**
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

### 3. OpenClawのセットアップ

上記のインストールコマンドを実行した後、設定プロセスが自動的に開始されます。開始されない場合は、以下のコマンドを実行して設定を開始できます：

```bash
openclaw onboard --install-daemon
```

**設定を開始:**

- `I understand this is powerful and inherently risky. Continue?` | 選択 ● `Yes`
- `Onboarding mode` | 選択 ● `Quick Start`
- `Model/auth provider` | 選択 ● `Z.AI`

### 4. Z.AIプロバイダーの設定

Z.AIをModel/auth providerとして選択すると、APIキーを入力するよう求められます。Z.AI APIキーを貼り付けてEnterキーを押してください。

### 5. セットアップの完了

残りのOpenClaw機能設定を続けます。

- `Select channel` | 必要なものを選択して設定します。
- `Configure skills` | 必要なものを選択してインストールします。
- `Finish setup`

### 6. ボットとの対話

セットアップ後、CLIから `How do you want to hatch your bot?` と尋ねられます。

- 選択 ● `Hatch in TUI (recommended)`

これで、Terminal UIでボットとチャットを開始できます。

> **注意:** OpenClawはWeb UI、Discord、Slackなど、ボットと対話するための追加チャネルを提供しています。公式ドキュメントを参照してこれらのチャネルを設定できます：[Channels Setup](https://docs.openclaw.ai/channels/setup)

- Web UIの場合、ターミナルに表示される `Web UI (with token)` リンクを開くことでアクセスできます。

### 7. インストール後

すべてが正しく動作していることを確認します：

```bash
openclaw doctor  # 設定の問題をチェック
openclaw status  # gatewayの状態
openclaw dashboard  # ブラウザUIを開く
```

> **注意:** 詳細な設定ガイドについては、[公式ドキュメント](https://docs.openclaw.ai/start/getting-started)を参照してください。

> **警告:** OpenClawは、誤って設定された場合や適切なアクセス制御なしでデプロイされた場合、セキュリティリスクが生じる可能性があります。[公式セキュリティドキュメント](https://docs.openclaw.ai/gateway/security)を参照してください。

---

## 高度な設定

### モデルフェイルオーバー

信頼性を確保するためにモデルフェイルオーバーを設定します：

**`.openclaw/openclaw.json`:**

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

> スキルとは、SKILL.mdファイルを含むフォルダのことです。OpenClawエージェントに新しい機能を追加したい場合、[ClawHub](https://clawhub.ai/)はスキルを見つけてインストールする最も簡単な方法です。

#### clawhubのインストール

```bash
npm i -g clawhub
```

#### スキルの管理

**スキルを検索:**
```bash
clawhub search "postgres backups"
```

**新しいスキルをダウンロード:**
```bash
clawhub install my-skill-pack
```

**インストール済みのスキルを更新:**
```bash
clawhub update --all
```

### プラグイン

> プラグインとは、OpenClawに追加機能（コマンド、ツール、Gateway RPC）を追加する小さなコードモジュールです。

**既に読み込まれているものを確認:**
```bash
openclaw plugins list
```

**公式プラグインをインストール（例: Voice Call）:**
```bash
openclaw plugins install @openclaw/voice-call
```

**Gatewayを再起動:**
```bash
openclaw gateway restart
```

---

## トラブルシューティング

### 一般的な問題

#### APIキー認証
- Z.AI APIキーが有効であり、GLM Coding Planを持っていることを確認します
- APIキーが環境に正しく設定されていることを確認します

#### モデルの可用性
- GLMモデルがあなたの地域で利用可能であることを確認します
- モデル名の形式を確認します（`zai/glm-4.7` であるべきです）

#### 接続の問題
- OpenClaw gatewayが実行されていることを確認します
- Z.AIエンドポイントへのネットワーク接続を確認します

---

## リソース

- **OpenClawドキュメント:** [docs.openclaw.ai](https://docs.openclaw.ai/)
- **OpenClaw GitHub:** [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)
- **Z.AI開発者ドキュメント:** [docs.z.ai](https://docs.z.ai/)
- **コミュニティスキル:** [awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)

---

## 📎 参考リンク

- [元ドキュメント: OpenClaw Integration Guide](https://docs.z.ai/devpack/tool/openclaw)
- [OpenClaw公式ドキュメント](https://docs.openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [Z.AI開発者ドキュメント](https://docs.z.ai/)
- [ClawHub](https://clawhub.ai/)
