# Slack - OpenClaw（日本語訳）

## ソケットモード（デフォルト）

### クイックセットアップ（初心者向け）

- Slackアプリを作成し、ソケットモードを有効化します。
- アプリトークン（xapp-...）とボットトークン（xoxb-...）を作成します。
- OpenClawのトークンを設定して、ゲートウェイを起動します。

最小設定：
```json
{
  channels: {
    slack: {
      enabled: true,
      appToken: "xapp-...",
      botToken: "xoxb-...",
    },
  },
}
```

### セットアップ

- [https://api.slack.com/apps](https://api.slack.com/apps) でSlackアプリを作成します（ゼロから作成）。
- ソケットモード → 有効に切り替えます。その後、基本情報 → アプリレベルトークン → トークンとスコープの生成（connections:writeスコープ）に移動し、アプリトークン（xapp-...）をコピーします。
- OAuth & 権限 → ボットトークンスコープを追加します（下のマニフェストを使用）。ワークスペースにインストールをクリックします。ボットユーザーOAuthトークン（xoxb-...）をコピーします。
- オプション：OAuth & 権限 → ユーザートークンスコープを追加します（読み取り専用リストを下に参照）。アプリを再インストールし、ユーザーOAuthトークン（xoxp-...）をコピーします。
- イベントサブスクリプション → イベントを有効化し、以下をサブスクライブします：
  - message.*（編集/削除/スレッドブロードキャストを含む）
  - app_mention
  - reaction_added、reaction_removed
  - member_joined_channel、member_left_channel
  - channel_rename
  - pin_added、pin_removed
- ボットを読み取りたいチャンネルに招待します。
- スラッシュコマンド → channels.slack.slashCommandを使用する場合、/openclawを作成します。ネイティブコマンドを有効化する場合、ビルドインコマンドごとに1つのスラッシュコマンドを追加します（/helpと同じ名前）。Slackのネイティブコマンドはデフォルトでオフです（channels.slack.commands.native: trueを設定しない限り）。global設定のcommands.nativeは"auto"で、これはSlackをオフのままにします。
- アプリホーム → メッセージタブを有効化し、ユーザーがボットにDMできるようにします。

以下のマニフェストを使用して、スコープとイベントを同期させたままにします。

マルチアカウントサポート：共有パターンについては、[gateway/configuration](/gateway/configuration#telegramaccounts--discordaccounts--slackaccounts--signalaccounts--imessageaccounts) を参照してください。channels.slack.accountsを使用して、アカウントごとのトークンとオプションの名前を設定します。

### OpenClaw設定（最小）

環境変数経由でトークンを設定します（推奨）：
- SLACK_APP_TOKEN=xapp-...
- SLACK_BOT_TOKEN=xoxb-...

または設定ファイル経由：
```json
{
  channels: {
    slack: {
      enabled: true,
      appToken: "xapp-...",
      botToken: "xoxb-...",
    },
  },
}
```

### ユーザートークン（オプション）

OpenClawはSlackユーザートークン（xoxp-...）を使用して、読み取り操作（履歴、ピン、リアクション、絵文字、メンバー情報）を行うことができます。デフォルトでは、これは読み取り専用です：ユーザートークンがある場合に優先して使用し、書き込みは明示的にオプトインしない限り、ボットトークンを使用し続けます。userTokenReadOnly: falseを設定しても、ボットトークンは利用可能な場合に書き込みで優先されます。

ユーザートークンは設定ファイルで設定されます（環境変数サポートなし）。マルチアカウントの場合、channels.slack.accounts.<id>.userTokenを設定します。

ボット + アプリ + ユーザートークンの例：
```json
{
  channels: {
    slack: {
      enabled: true,
      appToken: "xapp-...",
      botToken: "xoxb-...",
      userToken: "xoxp-...",
    },
  },
}
```

userTokenReadOnlyを明示的に設定した例（ユーザートークン書き込みを許可）：
```json
{
  channels: {
    slack: {
      enabled: true,
      appToken: "xapp-...",
      botToken: "xoxb...",
      userToken: "xoxp...",
      userTokenReadOnly: false,
    },
  },
}
```

#### トークン使用法

- 読み取り操作（履歴、リアクションリスト、ピンリスト、絵文字リスト、メンバー情報、検索）は、設定されている場合にユーザートークンを優先し、それ以外はボットトークンを使用します。
- 書き込み操作（メッセージ送信/編集/削除、リアクション追加/削除、ピン/ピン解除、ファイルアップロード）は、デフォルトでボットトークンを使用します。userTokenReadOnly: falseでボットトークンが利用可能でない場合、OpenClawはユーザートークンにフォールバックします。

### 履歴コンテキスト

- channels.slack.historyLimit（またはchannels.slack.accounts.*.historyLimit）は、プロンプトにラップする最近のチャンネル/グループメッセージの数を制御します。
- messages.groupChat.historyLimitにフォールバックします。0に設定して無効化します（デフォルト50）。

## HTTPモード（Events API）

ゲートウェイがSlackからHTTPS経由で到達可能な場合、HTTPウェブフックモードを使用します（サーバーデプロイで典型的）。
HTTPモードはEvents API + Interactivity + スラッシュコマンドを共有リクエストURLで使用します。

### セットアップ

- Slackアプリを作成し、ソケットモードを無効化します（HTTPのみ使用する場合）。
- 基本情報 → 署名シークレットをコピーします。
- OAuth & 権限 → アプリをインストールし、ボットユーザーOAuthトークン（xoxb-...）をコピーします。
- イベントサブスクリプション → イベントを有効化し、ゲートウェイウェブフックパス（デフォルト /slack/events）にリクエストURLを設定します。
- Interactivity & ショートカット → 有効化し、同じリクエストURLを設定します。
- スラッシュコマンド → コマンド（複数可）に同じリクエストURLを設定します。

リクエストURLの例：
```
https://gateway-host/slack/events
```

### OpenClaw設定（最小）

```json
{
  channels: {
    slack: {
      enabled: true,
      mode: "http",
      botToken: "xoxb...",
      signingSecret: "your-signing-secret",
      webhookPath: "/slack/events",
    },
  },
}
```

マルチアカウントHTTPモード：channels.slack.accounts.<id>.mode = "http"を設定し、各Slackアプリが独自のURLを指すように、アカウントごとの一意なwebhookPathを提供します。

### マニフェスト（オプション）

このSlackアプリマニフェストを使用して、アプリを素早く作成します（必要に応じて名前/コマンドを調整）。ユーザートークンを設定する場合、ユーザースコープを含めます。

```json
{
  "display_information": {
    "name": "OpenClaw",
    "description": "Slack connector for OpenClaw"
  },
  "features": {
    "bot_user": {
      "display_name": "OpenClaw",
      "always_online": false
    },
    "app_home": {
      "messages_tab_enabled": true,
      "messages_tab_read_only_enabled": false
    },
    "slash_commands": [
      {
        "command": "/openclaw",
        "description": "Send a message to OpenClaw",
        "should_escape": false
      }
    ]
  },
  "oauth_config": {
    "scopes": {
      "bot": [
        "chat:write",
        "channels:history",
        "channels:read",
        "groups:history",
        "groups:read",
        "groups:write",
        "im:history",
        "im:read",
        "im:write",
        "mpim:history",
        "mpim:read",
        "mpim:write",
        "users:read",
        "app_mentions:read",
        "reactions:read",
        "reactions:write",
        "pins:read",
        "pins:write",
        "emoji:read",
        "commands",
        "files:read",
        "files:write"
      ],
      "user": [
        "channels:history",
        "channels:read",
        "groups:history",
        "groups:read",
        "im:history",
        "im:read",
        "mpim:history",
        "mpim:read",
        "users:read",
        "reactions:read",
        "pins:read",
        "emoji:read",
        "search:read"
      ]
    }
  },
  "settings": {
    "socket_mode_enabled": true,
    "event_subscriptions": {
      "bot_events": [
        "app_mention",
        "message.channels",
        "message.groups",
        "message.im",
        "message.mpim",
        "reaction_added",
        "reaction_removed",
        "member_joined_channel",
        "member_left_channel",
        "channel_rename",
        "pin_added",
        "pin_removed"
      ]
    }
  }
}
```

ネイティブコマンドを有効化する場合、公開したいコマンドごとに1つのslash_commandsエントリを追加します（/helpリストと一致）。channels.slack.commands.nativeで上書きします。

## スコープ（必須 vs オプション）

SlackのConversations APIは型スコープ化されています：実際に触れる会話の種類に必要なスコープのみが必要です（チャンネル、グループ、DM、MPIM）。概要については、[Slack Conversations APIのドキュメント](https://docs.slack.dev/apis/web-api/using-the-conversations-api/) を参照してください。

### ボットトークンスコープ（必須）

- **chat:write**（chat.postMessage経由でメッセージ送信/更新/削除）[chat.postMessageのドキュメント](https://docs.slack.dev/reference/methods/chat.postMessage)
- **im:write**（conversations.open経由でユーザーDMを開く）[conversations.openのドキュメント](https://docs.slack.dev/reference/methods/conversations.open)
- **channels:history、groups:history、im:history、mpim:history**（conversations.historyのドキュメント](https://docs.slack.dev/reference/methods/conversations.history)
- **channels:read、groups:read、im:read、mpim:read**（conversations.infoのドキュメント](https://docs.slack.dev/reference/methods/conversations.info)
- **users:read**（ユーザー検索）[users.infoのドキュメント](https://docs.slack.dev/reference/methods/users.info)
- **reactions:read、reactions:write**（reactions.get / reactions.add）[reactions.getのドキュメント](https://docs.slack.dev/reference/methods/reactions.get)、[reactions.addのドキュメント](https://docs.slack.dev/reference/methods/reactions.add)
- **pins:read、pins:write**（pins.list / pins.add / pins.remove）[pins.readスコープ](https://docs.slack.dev/reference/scopes/pins.read)、[pins.writeスコープ](https://docs.slack.dev/reference/scopes/pins.write)
- **emoji:read**（emoji.list）[emoji.readスコープ](https://docs.slack.dev/reference/scopes/emoji.read)
- **files:write**（files.uploadV2経由でアップロード）[ファイルアップロードのドキュメント](https://docs.slack.dev/messaging/working-with-files/#upload)

### ユーザートークンスコープ（オプション、デフォルトで読み取り専用）

channels.slack.userTokenを設定する場合、ユーザートークンスコープ以下に追加します：

- **channels:history、groups:history、im:history、mpim:history**
- **channels:read、groups:read、im:read、mpim:read**
- **users:read**
- **reactions:read**
- **pins:read**
- **emoji:read**
- **search:read**

### 現在は不要だが将来的に必要と思われるもの

- **mpim:write**（グループDMオープン/DM開始をconversations.open経由で追加する場合のみ）
- **groups:write**（プライベートチャンネル管理を作成/変更/招待/アーカイブする場合のみ）
- **chat:write.public**（ボットが参加していないチャンネルに投稿する場合のみ）[chat.write.publicスコープ](https://docs.slack.dev/reference/scopes/chat.write.public)
- **users:read.email**（users.infoからメールフィールドを取得する場合のみ）[メールアクセスの絞り込みの変更ログ](https://docs.slack.dev/changelog/2017-04-narrowing-email-access)
- **files:read**（ファイルメタデータをリスト/読み取りを開始する場合のみ）

## 設定

Slackはソケットモードのみを使用します（HTTPウェブフックサーバーなし）。両方のトークンを提供します：

```json
{
  "slack": {
    "enabled": true,
    "botToken": "xoxb-...",
    "appToken": "xapp-...",
    "groupPolicy": "allowlist",
    "dm": {
      "enabled": true,
      "policy": "pairing",
      "allowFrom": ["U123", "U456", "*"],
      "groupEnabled": false,
      "groupChannels": ["G123"],
      "replyToMode": "all"
    },
    "channels": {
      "C123": { 
        "allow": true, 
        "requireMention": true 
      },
      "#general": {
        "allow": true,
        "requireMention": true,
        "users": ["U123"],
        "skills": ["search", "docs"],
        "systemPrompt": "Keep answers short."
      }
    },
    "reactionNotifications": "own",
    "reactionAllowlist": ["U123"],
    "replyToMode": "off",
    "actions": {
      "reactions": true,
      "messages": true,
      "pins": true,
      "memberInfo": true,
      "emojiList": true
    },
    "slashCommand": {
      "enabled": true,
      "name": "openclaw",
      "sessionPrefix": "slack:slash",
      "ephemeral": true
    },
    "textChunkLimit": 4000,
    "mediaMaxMb": 20
  }
}
```

トークンは環境変数でも提供できます：
- SLACK_BOT_TOKEN
- SLACK_APP_TOKEN

ACKリアクションはmessages.ackReaction + messages.ackReactionScopeでグローバルに制御されます。メッセージ.removeAckAfterReplyを使用して、ボット返信後にACKリアクションを削除します。

## 制限

- 送信テキストはchannels.slack.textChunkLimitでチャンク化されます（デフォルト4000）。
- オプションの改行チャンキング：channels.slack.chunkMode="newline"を設定して、長さチャンキングの前に空白行（段落境界）で分割します。
- メディアアップロードはchannels.slack.mediaMaxMbで制限されます（デフォルト20）。

## 返信スレッド化

デフォルトでは、OpenClawはメインチャンネルで返信します。自動的なスレッド化を制御するには、channels.slack.replyToModeを使用します：

| モード | 動作 |
|--------|--------|
| **off** | デフォルト。メインチャンネルで返信します。トリガーになるメッセージが既にスレッド内にある場合のみスレッドに返信します。 |
| **first** | 最初の返信はスレッド（トリガーなるメッセージの下）に行われ、その後の返信はメインチャンネルに行われます。コンテキストを可視化しながら、スレッドの散らかりを回避するのに役立ちます。 |
| **all** | すべての返信がスレッドに行われます。会話を整理したままにしますが、可視性が低下する可能性があります。 |

このモードは自動返信とエージェントツールコール（slack sendMessage）の両方に適用されます。

### チャットタイプごとのスレッド化

channels.slack.replyToModeByChatTypeを設定して、チャットタイプごとに異なるスレッド化動作を設定できます：

```json
{
  channels: {
    slack: {
      replyToMode: "off", // チャンネルのデフォルト
      replyToModeByChatType: {
        direct: "all",    // DMは常にスレッド化
        group: "first",   // グループDM/MPIMの最初の返信をスレッド化
      },
    },
  },
}
```

サポートされるチャットタイプ：
- **direct**: 1:1 DM（Slack im）
- **group**: グループDM / MPIM（Slack mpim）
- **channel**: 標準チャンネル（パブリック/プライベート）

優先順位：
1. replyToModeByChatType
2. replyToMode
3. プロバイダーデフォルト（off）

レガシーなchannels.slack.dm.replyToModeは、チャットタイプのオーバーライドが設定されていない場合のダイレクトへのフォールバックとしてまだ受け入れられます。

例：

DMのみスレッド化：
```json
{
  channels: {
    slack: {
      replyToMode: "off",
      replyToModeByChatType: { direct: "all" },
    },
  },
}
```

グループDMをスレッド化するがチャンネルをルートに維持：
```json
{
  channels: {
    slack: {
      replyToMode: "off",
      replyToModeByChatType: { group: "first" },
    },
  },
}
```

チャンネルをスレッド化し、DMをルートに維持：
```json
{
  channels: {
    slack: {
      replyToMode: "first",
      replyToModeByChatType: { direct: "off", group: "off" },
    },
  },
}
```

### 手動スレッド化タグ

細かい制御のために、エージェント応答でこれらのタグを使用します：
- `[[reply_to_current]]` — トリガーなるメッセージに返信します（スレッド開始/継続）。
- `[[reply_to:<id>]]` — 特定のメッセージIDに返信します。

## セッション + ルーティング

- DMはメインセッションを共有します（WhatsApp/Telegramと同様）。
- チャンネルは agent::slack:channel:<id> セッションにマップされます。
- スラッシュコマンドは agent::slack:slash:<command> セッションを使用します（channels.slack.slashCommand.sessionPrefixで接頭辞設定可能）。
- Slackがchannel_typeを提供しない場合、OpenClawはチャンネルID接頭辞（D、C、G）から推論し、セッションキーを安定させるためにデフォルトでチャンネルとします。
- ネイティブコマンド登録は、commands.native（グローバルデフォルト"auto" → Slackオフ）を使用し、channels.slack.commands.nativeでワークスペースごとに上書きできます。テキストコマンドはスタンドアロンの /... メッセージを必要とし、commands.text: falseで無効化できます。SlackスラッシュコマンドはSlackアプリで管理され、自動的には削除されません。コマンドでアクセスグループチェックをバイパスするには、commands.useAccessGroups: falseを使用します。
- コマンドの完全なリスト + 設定：[スラッシュコマンド](/tools/slash-commands)

## DMセキュリティ（ペアリング）

- デフォルト：channels.slack.dm.policy="pairing" — 不明なDM送信者はペアリングコードを取得します（1時間後に有効期限切れ）。
- 承認：`openclaw pairing approve slack <code>` 経由
- 誰でも許可する場合：channels.slack.dm.policy="open" を設定し、channels.slack.dm.allowFrom=["*"] を設定します。
- channels.slack.dm.allowFromは、ユーザーID、@ハンドル、またはメール（トークンが許可する場合、起動時に解決されます）を受け入れます。ウィザードはユーザー名を受け入れ、セットアップ時に可能な場合にIDに解決します。
- channels.slack.dm.policy、channels.defaults.groupPolicy、またはチャネルアローリストを追加してlock it down（制限）する必要があります。
- ウィザード設定は #channel 名を受け入れ、可能な場合にIDに解決します（パブリック + プライベート）；複数の一致が存在する場合、アクティブチャンネルを優先します。
- 起動時、OpenClawはアローリスト内のチャンネル/ユーザー名をIDに解決し（トークンが許可する場合）、マッピングをログに記録します；解決されないエントリは入力されたままに維持されます。
- チャンネルを許可しない場合、channels.slack.groupPolicy: "disabled" を設定します（または空のアローリストを維持します）。

チャンネルオプション（channels.slack.channels.<id> または channels.slack.channels.<name>）：
- **allow**: groupPolicy="allowlist"の場合にチャンネルを許可/拒否します。
- **requireMention**: チャンネルのメンションゲーティング。
- **tools**: チャンネルごとのツールポリシーのオーバーライド（allow/deny/alsoAllow）。
- **toolsBySender**: チャンネル内の送信者ごとのツールポリシーのオーバーライド（キーは送信者ID/@ハンドル/メールです；"*" ワイルドカードがサポートされます）。
- **allowBots**: このチャンネルでボット作成メッセージを許可します（デフォルト：false）。
- **users**: チャンネルごとのユーザーアローリスト（オプション）。
- **skills**: スキルフィルタ（omit = 全スキル、空 = なし）。
- **systemPrompt**: チャンネル用の追加システムプロンプト（トピック/目的と結合されます）。
- **enabled**: チャンネルを無効化するにはfalseを設定します。

## 配信ターゲット

cron/CLI送信でこれらを使用します：
- **user**: DM用
- **channel**: チャンネル用

## ツールアクション

Slackツールアクションはchannels.slack.actions.*でゲートできます：

| アクショングループ | デフォルトメモ |
|----------------|--------------|
| reactions | 有効化されるとリアクション + リスト |
| messages | 有効化されると読み取り/送信/編集/削除 |
| pins | 有効化されるとピン/ピン解除/リスト |
| memberInfo | 有効化されるとメンバー情報 |
| emojiList | 有効化されるとカスタム絵文字リスト |

## セキュリティ上の注意事項

- 書き込みはデフォルトでボットトークンを使用するため、状態変更アクションはアプリのボット権限とIDの範囲内に留まります。
- userTokenReadOnly: falseを設定すると、ボットトークンが利用可能でない場合にユーザートークンが書き込み操作に使用されます。これは、インストールしているユーザーのアクセス権限でアクションが実行されることを意味します。ユーザートークンを高度な権限として扱い、アクションゲートとアローリストを厳密に保つ必要があります。
- ユーザートークン書き込みを有効化する場合、期待する書き込みスコープを含めていることを確認します（chat:write、reactions:write、pins:write、files:write）。それ以外は操作が失敗します。

## 注記

- メンションゲーティングはchannels.slack.channelsで制御されます（requireMentionをtrueに設定）；agents.list[].groupChat.mentionPatterns（またはmessages.groupChat.mentionPatterns）もメンションとしてカウントします。
- マルチエージェントオーバーライド：agents.list[].groupChat.mentionPatternsでエージェントごとのパターンを設定します。
- リアクション通知はchannels.slack.reactionNotificationsに従います（mode "allowlist"でreactionAllowlistを使用）。
- ボット作成メッセージはデフォルトで無視されます。channels.slack.allowBotsまたはchannels.slack.channels.<id>.allowBotsで有効化します。
- 注意：ボットへの返信を許可する場合（channels.slack.allowBots=trueまたはchannels.slack.channels.<id>.allowBots=true）、ボットからボットへの返信ループを防ぐためにrequireMention、channels.slack.channels.<id>.usersアローリスト、および/またはAGENTS.mdとSOUL.mdでクリアガードレールをクリアする必要があります。
- Slackツールの場合、リアクション削除の意味は[/tools/reactions](/tools/reactions)にあります。
- 添付ファイルは許可されサイズ制限内にある場合、メディアストアにダウンロードされます。
