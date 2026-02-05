---
layout: default
title: "OpenClaw Slack設定一覧"
parent: Reference
date: 2026-02-05
---

# OpenClaw Slack設定一覧

**作成日:** 2026-02-05
**タイプ:** 設定リファレンス
**対象:** `gateway config.schema` の `channels.slack.*` 設定項目

---

## 📋 概要

OpenClawのSlackコネクタは、Socket Mode（デフォルト）またはHTTP Mode（Events API）で動作します。以下はSlackチャンネルに関連する主要な設定項目の一覧です。

---

## 📝 基本設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `enabled` | `boolean` | Slackの有効/無効を設定します。 |
| `mode` | `socket` \| `http` | 動作モードを指定します。デフォルトは `socket`。 |
| `name` | `string` | 設定の表示名（主にUIで使用）。 |

---

## 🔐 認証情報

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `botToken` | `string` | SlackのBot User OAuth Token（`xoxb-...`）。 |
| `appToken` | `string` | SlackのApp-Level Token（`xapp-...`）。 |
| `userToken` | `string` | ユーザー用OAuth Token（`xoxp-...`）。読み取り操作に使用されます。 |
| `userTokenReadOnly` | `boolean` | ユーザートークンを読み取り専用にするか（デフォルト: `true`）。 |
| `signingSecret` | `string` | HTTPモード時のSlack署名シークレット。 |

---

## 🛠️ HTTPモード専用設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `webhookPath` | `string` | HTTP Webhookのパス（デフォルト: `/slack/events`）。 |

---

## 📢 ボット権限・スコープ

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `capabilities` | `array<string>` | Slackボットのスコープ（`chat:write`、`channels:history` など）。 |

---

## 💬 Markdown設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `markdown.tables` | `off` \| `bullets` \| `code` | Markdownテーブルの表示スタイルを指定します。 |

---

## 📚 履歴・コンテキスト

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `historyLimit` | `number` | チャンネル・グループメッセージの履歴取得数（デフォルト: 50、`0`で無効）。 |
| `dmHistoryLimit` | `number` | DM履歴の取得数制限。 |
| `dms` | `object` | 複数アカウントのDM履歴制限を設定します（キー: アカウントID、値: `historyLimit`）。 |

---

## 🔤 出力・チャンキング

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `textChunkLimit` | `number` | 出力テキストのチャンク制限（デフォルト: 4000）。 |
| `chunkMode` | `length` \| `newline` | チャンキングモード（長さまたは改行で分割）。 |
| `blockStreaming` | `boolean` | ブロックストリーミングをブロックするか（デフォルト: `false`）。 |
| `blockStreamingCoalesce` | `object` | ブロックストリーミングの結合設定（`minChars`、`maxChars`、`idleMs`）。 |
| `mediaMaxMb` | `number` | メディアアップロードの最大サイズ（デフォルト: 20 MB）。 |

---

## 🔁 リアクション通知

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `reactionNotifications` | `off` \| `own` \| `all` \| `allowlist` | リアクション通知のモード。 |
| `reactionAllowlist` | `array<string \| number>` | リアクション通知の許可リスト（`allowlist`モード時）。 |

---

## 💬 リプライモード

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `replyToMode` | `off` \| `first` \| `all` | 全体のリプライモード（デフォルト: `off`）。 |
| `replyToModeByChatType` | `object` | チャットタイプ別のリプライモード（`direct`、`group`、`channel`）。 |

---

## 🧵 スレッド設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `thread.historyScope` | `thread` \| `channel` | スレッド履歴のスコープ（`thread`で分離、`channel`で親チャンネル履歴を使用）。 |
| `thread.inheritParent` | `boolean` | 親チャンネルの履歴を継承するか（デフォルト: `false`）。 |

---

## 🔧 アクション設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `actions.reactions` | `boolean` | リアクションを取得・送信するか（デフォルト: `true`）。 |
| `actions.messages` | `boolean` | メッセージの送信・編集・削除を許可するか（デフォルト: `true`）。 |
| `actions.pins` | `boolean` | ピン操作を許可するか（デフォルト: `true`）。 |
| `actions.search` | `boolean` | 検索操作を許可するか（デフォルト: `true`）。 |
| `actions.permissions` | `boolean` | 権限情報の取得を許可するか（デフォルト: `true`）。 |
| `actions.memberInfo` | `boolean` | メンバー情報の取得を許可するか（デフォルト: `true`）。 |
| `actions.channelInfo` | `boolean` | チャンネル情報の取得を許可するか（デフォルト: `true`）。 |
| `actions.emojiList` | `boolean` | カスタム絵文字リストの取得を許可するか（デフォルト: `true`）。 |

---

## ⚡ コマンド設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `commands.native` | `boolean` \| `auto` | ネイティブコマンドを登録するか（Slackデフォルト: `off`、グローバル `auto` だと継承）。 |
| `commands.nativeSkills` | `boolean` \| `auto` | ユーザー呼び出し可能スキル（`nativeSkills`）を登録するか。 |
| `slashCommand.enabled` | `boolean` | スラッシュコマンドを有効にするか。 |
| `slashCommand.name` | `string` | スラッシュコマンド名（デフォルト: `openclaw`）。 |
| `slashCommand.sessionPrefix` | `string` | スラッシュコマンドで使用されるセッションキーのプレフィックス（デフォルト: `slack:slash`）。 |
| `slashCommand.ephemeral` | `boolean` | スラッシュコマンドの返信をエフェメラルにするか（デフォルト: `true`）。 |

---

## 💬 ダイレクトメッセージ（DM）設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `dm.enabled` | `boolean` | DMを有効にするか。 |
| `dm.policy` | `pairing` \| `allowlist` \| `open` \| `disabled` | DMアクセスポリシー（デフォルト: `pairing`）。 |
| `dm.allowFrom` | `array<string \| number>` | DM許可リスト（ユーザーID、ハンドル、またはメールアドレス）。 |
| `dm.groupEnabled` | `boolean` | グループDM（MPIM）を有効にするか。 |
| `dm.groupChannels` | `array<string \| number>` | グループDMのチャンネル許可リスト。 |
| `dm.replyToMode` | `off` \| `first` \| `all` | DMのリプライモード（全体的設定を上書き）。 |

---

## 📚 チャンネル設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `groupPolicy` | `open` \| `disabled` \| `allowlist` | チャンネルの扱いポリシー（デフォルト: `allowlist`）。 |
| `allowBots` | `boolean` | ボットからのメッセージをトリガーにするか（デフォルト: `false`）。 |
| `requireMention` | `boolean` | チャンネルでメンションを要求するか（デフォルト: `true`）。 |
| `channels.<id>.allow` | `boolean` | チャンネルを許可リストに含めるか（`allowlist`ポリシー時）。 |
| `channels.<id>.requireMention` | `boolean` | チャンネルごとのメンション要求設定（全体設定を上書き）。 |
| `channels.<id>.tools` | `object` | チャンネルごとのツールポリシー（`allow`、`deny`、`alsoAllow`）。 |
| `channels.<id>.toolsBySender` | `object` | 送信者ごとのツールポリシー（キー: 送信者ID/ハンドル/メール、値: ポリシー）。 |
| `channels.<id>.allowBots` | `boolean` | チャンネルごとのボット許可設定。 |
| `channels.<id>.users` | `array<string \| number>` | チャンネルごとのユーザー許可リスト。 |
| `channels.<id>.skills` | `array<string>` | チャンネルごとのスキルフィルター（`none`でスキル無効）。 |
| `channels.<id>.systemPrompt` | `string` | チャンネルごとの追加システムプロンプト。 |

---

## 💓 ハートビート設定

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `heartbeat.showOk` | `boolean` | OKステータスを表示するか（デフォルト: `true`）。 |
| `heartbeat.showAlerts` | `boolean` | アラートを表示するか（デフォルト: `true`）。 |
| `heartbeat.useIndicator` | `boolean` | ステータスインジケーターを使用するか（デフォルト: `true`）。 |

---

## 🔌 複数アカウント設定（`accounts`）

| 設定名 | 設定できる内容 | 説明 |
|---------|----------------|--------|
| `accounts.<id>.name` | `string` | アカウント名（主にUIで使用）。 |
| `accounts.<id>.mode` | `socket` \| `http` | アカウントごとの動作モード。 |
| `accounts.<id>.webhookPath` | `string` | HTTPモード時のWebhookパス（アカウントごとに設定可能）。 |
| `accounts.<id>.*` | - | 上記の基本設定の他、`botToken`、`appToken`、`userToken` などをアカウントごとに設定できます。 |

---

## 📝 注意事項

1. **セキュリティ**
   - トークン（`botToken`、`appToken`、`userToken`）は機密情報として取り扱ってください。
   - `allowBots=true` はボットからのメッセージをトリガーにするため、**ボット同士の無限ループ**を防ぐために `requireMention` と併用して安全にしてください。

2. **スレッドセッション分離**
   - スレッドごとにセッションを分けるネイティブ機能はありません。スレッドはチャンネルセッションの一部として扱われます。
   - スレッドごとのコンテキスト分離が必要な場合、別のチャンネルを作成することを推奨します。

3. **権限管理**
   - `groupPolicy` はデフォルトで `allowlist` ですが、`channels` セクションを明示的に設定しないと `open` になります。セキュリティを高めるために、必ず `allowlist` ポリシーと必要なチャンネルを設定してください。

4. **コマンド設定**
   - ネイティブコマンド（`native`）はSlackで手動で作成する必要があります。
   - ユーザー呼び出し可能スキル（`nativeSkills`）はスキルの `user-invocable: true` が設定されている場合のみ利用できます。

---

## 📎 参考資料

- [Slack - OpenClaw](https://docs.openclaw.ai/channels/slack)
- [Session Management - OpenClaw](https://docs.openclaw.ai/concepts/session)

---

**Clawから一言:**
Slack設定は柔軟で、チャンネルごとのポリシー調整やツール制限などが細かくできます。特に `groupPolicy` と `allowlist` の組み合わせで、ボットの活動範囲を明確に制御するのがポイントですね。
