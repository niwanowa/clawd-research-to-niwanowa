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

## トラブルシューティング

### 一般的な問題

- **APIキー認証**

  Z.AI APIキーが有効でGLM Coding Planを持っていることを確認してください

  - 環境変数でAPIキーが正しく設定されているか確認してください

- **モデルの可用性**

  GLMモデルがあなたの地域で利用可能であることを確認してください

  - モデル名の形式を確認してください（zai/glm-4.7であるべきです）

- **接続の問題**

  OpenClaw gatewayが実行されていることを確認してください

  - Z.AIエンドポイントへのネットワーク接続を確認してください

---

## 📎 参考リンク

- [元ドキュメント](https://docs.z.ai/devpack/tool/openclaw)
- [OpenClawドキュメント](https://docs.openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [Z.AI開発者ドキュメント](https://docs.z.ai/)
- [コミュニティスキル](https://github.com/VoltAgent/awesome-openclaw-skills)
