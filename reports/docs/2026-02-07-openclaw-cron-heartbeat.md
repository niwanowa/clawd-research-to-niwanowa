---
layout: default
title: "OpenClaw - Cron & Heartbeat 完全ガイド"
parent: ドキュメント・翻訳
date: 2026-02-07
---

# OpenClaw - Cron & Heartbeat 完全ガイド

**作成日:** 2026-02-07  
**タイプ:** ドキュメント翻訳  
**元ソース:**
- [Cron vs Heartbeat](https://docs.openclaw.ai/automation/cron-vs-heartbeat)
- [Cron Jobs](https://docs.openclaw.ai/automation/cron-jobs)
- [Heartbeat](https://docs.openclaw.ai/gateway/heartbeat)

---

## 📝 概要

OpenClawにおける定期実行タスクの仕組み「Heartbeat」と「Cron」の使い分けガイドと、それぞれの詳細設定についてまとめたドキュメント。

---

## 📄 内容

## 1. Heartbeat vs Cron - 選択ガイド

### クイック決定ガイド

| ユースケース | 推奨 | 理由 |
|-------------|------|------|
| 30分ごとの受信トレイチェック | Heartbeat | 他のチェックとまとめて実行、コンテキスト認識 |
| 毎朝9時に日報を送る | Cron (isolated) | 正確なタイミングが必要 |
| カレンダーのイベント監視 | Heartbeat | 定期的な意識向上に自然 |
| 毎週の詳細分析 | Cron (isolated) | スタンドアロンタスク、別モデル使用可能 |
| 20分後にリマインド | Cron (main, --at) | 正確なワンショットタイミング |
| プロジェクト健全性チェック | Heartbeat | 既存サイクルに乗る |

---

## 2. Heartbeat - 定期的な意識向上

### Heartbeatとは
- メインセッションで一定間隔（デフォルト：30分）で実行されるエージェントターン
- エージェントが重要事項を通知できるように設計
- HEARTBEAT.mdファイルにチェックリストを記述して実行内容を制御

### Heartbeatを使用するタイミング

- **複数の定期チェック:** 5つの個別のcronジョブではなく、1つのheartbeatでまとめて実行
- **コンテキスト認識:** エージェントが完全なメインセッションコンテキストを持ち、何が緊急か判断できる
- **会話の継続性:** 同じセッションで実行されるため、最近の会話を記憶
- **低オーバーヘッドの監視:** 1つのheartbeatで複数のポーリングタスクを置き換え

### Heartbeatの利点

- 複数のチェックをまとめて実行（受信トレイ、カレンダー、通知をまとめてレビュー）
- APIコールの削減（5つの分離されたcronジョブより安価）
- コンテキスト認識（作業内容を知っており、優先順位を判断可能）
- スマートな抑制（注意が必要なければHEARTBEAT_OKで抑制）
- 自然なタイミング（キュー負荷に応じて少しズレるが、監視には問題ない）

### 設定例

```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "30m",
        "target": "last",
        "activeHours": { "start": "08:00", "end": "22:00" }
      }
    }
  }
}
```

### HEARTBEAT.md例

```markdown
# Heartbeat checklist

- 緊急のメールをスキャン
- 次の2時間のカレンダーイベントを確認
- 保留中のタスクをレビュー
- 8時間以上静かなら軽いチェックイン
```

### レスポンス契約

- 注意が必要なければ `HEARTBEAT_OK` で応答
- `HEARTBEAT_OK` は応答の先頭または末尾にある場合のみ特別扱い
- アラートには `HEARTBEAT_OK` を含めないこと

---

## 3. Cron - 正確なスケジューリング

### Cronとは
- Gateway内蔵のスケジューラ
- `~/.openclaw/cron/jobs.json` に永続化されるため、再起動してもスケジュールが失われない
- 2つの実行スタイル：
  - **Main session:** システムイベントをキューに入れ、次のheartbeatで実行
  - **Isolated:** `cron:` で専用のエージェントターンを実行

### Cronを使用するタイミング

- **正確なタイミングが必要:** 「毎週月曜の9:00AMに送信」（9:00前後ではなく）
- **スタンドアロンタスク:** 会話コンテキストを必要としないタスク
- **異なるモデル/思考設定:** 高品質な分析のための強力なモデル
- **ワンショットリマインダー:** `--at` による「20分後にリマインド」
- **頻繁なタスク:** メインセッション履歴を乱さないノイズの多いタスク
- **外部トリガー:** エージェントが他にアクティブかどうかに依存しないタスク

### Cronの利点

- 正確なタイミング（タイムゾーン対応の5フィールドcron式）
- セッション分離（メイン履歴を汚染せず実行）
- モデルオーバーライド（ジョブごとに安価または強力なモデルを選択）
- 配信制御（分離ジョブはデフォルトでannounce、noneも選択可能）
- 即時配信（announceモードはheartbeatを待たずに直接投稿）
- エージェントコンテキスト不要（メインセッションがアイドルでも実行）
- ワンショットサポート（将来のタイムスタンプ用の `--at`）

### スケジュールタイプ

| タイプ | 説明 | CLIオプション |
|-------|------|--------------|
| at | ワンショットタイムスタンプ (ISO 8601) | `--at` |
| every | 固定間隔 (ms) | `--every` |
| cron | 5フィールドcron式 | `--cron` |

### 実行モード

#### Main Session Jobs (system events)
- システムイベントをキューに入れ、オプションでheartbeatランナーをウェイク
- `payload.kind = "systemEvent"` が必要
- 通常のheartbeatプロンプト + メインセッションコンテキストに最適

#### Isolated Jobs (dedicated cron sessions)
- `cron:<jobId>` で専用のエージェントターンを実行
- 各実行で新しいセッションID（以前の会話は引き継がない）
- デフォルト：配信を省略するとannounce（サマリーを配信）
- 配信モード（分離ジョブのみ）：
  - `announce`: ターゲットチャンネルにサマリーを配信し、メインセッションにも短いサマリーを投稿
  - `none`: 内部のみ（配信なし、メインセッションサマリーなし）

### JSONスキーマ例

#### ワンショット、メインセッションジョブ
```json
{
  "name": "Reminder",
  "schedule": { "kind": "at", "at": "2026-02-01T16:00:00Z" },
  "sessionTarget": "main",
  "payload": { "kind": "systemEvent", "text": "Reminder text" },
  "deleteAfterRun": true
}
```

#### 再帰分離ジョブと配信
```json
{
  "name": "Morning brief",
  "schedule": { "kind": "cron", "expr": "0 7 * * *", "tz": "America/Los_Angeles" },
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Summarize overnight updates."
  },
  "delivery": {
    "mode": "announce",
    "channel": "slack",
    "to": "channel:C1234567890"
  }
}
```

### CLI クイックスタート

```bash
# ワンショットリマインダー（UTC ISO、成功後自動削除）
openclaw cron add \
  --name "Send reminder" \
  --at "2026-01-12T18:00:00Z" \
  --session main \
  --system-event "Reminder: submit expense report." \
  --wake now \
  --delete-after-run

# 再帰分離ジョブ（WhatsAppにannounce）
openclaw cron add \
  --name "Morning status" \
  --cron "0 7 * * *" \
  --tz "America/Los_Angeles" \
  --session isolated \
  --message "Summarize inbox + calendar for today." \
  --announce \
  --channel whatsapp \
  --to "+15551234567"

# 分離ジョブ（モデル・思考オーバーライド）
openclaw cron add \
  --name "Deep analysis" \
  --cron "0 6 * * 1" \
  --tz "America/Los_Angeles" \
  --session isolated \
  --message "Weekly deep analysis of project progress." \
  --model "opus" \
  --thinking high \
  --announce \
  --channel whatsapp \
  --to "+15551234567"
```

### 保存場所

- **ジョブストア:** `~/.openclaw/cron/jobs.json` （Gateway管理JSON）
- **実行履歴:** `~/.openclaw/cron/runs/.jsonl` （JSONL、自動削除）
- パスオーバーライド: `cron.store` in config

---

## 4. 決定フローチャート

1. タスクを**正確な時刻**に実行する必要がありますか？
   - **YES** → Cronを使用
   - **NO** → 続行...

2. タスクはメインセッションから**分離**する必要がありますか？
   - **YES** → Cron (isolated)
   - **NO** → 続行...

3. このタスクは他の定期チェックと**バッチ化**できますか？
   - **YES** → Heartbeat（HEARTBEAT.mdに追加）
   - **NO** → Cron

4. これは**ワンショットリマインダー**ですか？
   - **YES** → `--at` 付きのCron
   - **NO** → 続行...

5. 別のモデルまたは思考レベルが必要ですか？
   - **YES** → `--model`/`--thinking` 付きのCron (isolated)
   - **NO** → Heartbeat

---

## 5. 両方を組み合わせた効率的なセットアップ

### 推奨構成
- **Heartbeat:** 受信トレイ、カレンダー、通知などのルーチン監視を30分ごとにまとめて実行
- **Cron:** 日報、週次レビューなどの正確なスケジュールとワンショットリマインダー

### 設定例

#### HEARTBEAT.md（30分ごとにチェック）
```markdown
# Heartbeat checklist

- 緊急メールのスキャン
- 次の2時間のカレンダーイベントを確認
- 保留中のタスクのレビュー
- 8時間以上静かなら軽いチェックイン
```

#### Cronジョブ（正確なタイミング）
```bash
# 毎朝7時の日報
openclaw cron add --name "Morning brief" --cron "0 7 * * *" \
  --session isolated --message "..." --announce

# 毎週月曜9時のプロジェクトレビュー
openclaw cron add --name "Weekly review" --cron "0 9 * * 1" \
  --session isolated --message "..." --model opus

# ワンショットリマインダー
openclaw cron add --name "Call back" --at "2h" \
  --session main --system-event "Call back the client" --wake now
```

---

## 6. 詳細設定

### Heartbeat設定

| フィールド | 説明 | デフォルト |
|----------|------|-----------|
| every | ヘッドビート間隔 | "30m" |
| model | モデルオーバーライド | - |
| includeReasoning | Reasoningメッセージも配信 | false |
| target | 配信先 (last/none/チャンネルID) | "last" |
| to | チャンネル固有の受信者オーバーライド | - |
| accountId | マルチアカウント用のアカウントID | - |
| prompt | デフォルトプロンプトのオーバーライド | - |
| ackMaxChars | HEARTBEAT_OK後の最大文字数 | 300 |
| activeHours | 実行時間の制限 | - |

### アクティブ時間の例

```json
{
  "agents": {
    "defaults": {
      "heartbeat": {
        "every": "30m",
        "target": "last",
        "activeHours": {
          "start": "09:00",
          "end": "22:00",
          "timezone": "America/New_York"
        }
      }
    }
  }
}
```

### 配信コントロール

| フラグ | 説明 |
|-------|------|
| showOk | HEARTBEAT_OK確認を送信 |
| showAlerts | アラート内容を送信 |
| useIndicator | UIステータスのインジケーターイベントを発行 |

### Cron配信設定（分離ジョブのみ）

| フィールド | 説明 |
|----------|------|
| delivery.mode | "announce"（サマリー配信）または "none" |
| delivery.channel | whatsapp/telegram/discord/slack/etc/last |
| delivery.to | チャンネル固有の受信者ターゲット |
| delivery.bestEffort | announce配信失敗時にジョブを失敗させない |

---

## 7. コスト考慮事項

| メカニズム | コストプロファイル |
|-----------|-------------------|
| Heartbeat | N分ごとに1ターン。HEARTBEAT.mdのサイズに応じてスケール |
| Cron (main) | 次のheartbeatにイベントを追加（分離ターンなし） |
| Cron (isolated) | ジョブごとに完全なエージェントターン。安価なモデル使用可能 |

### ヒント

- HEARTBEAT.mdを小さく保ち、トークンオーバーヘッドを最小化
- 複数のcronジョブの代わりに類似したチェックをheartbeatにバッチ化
- 内部処理のみの場合は `target: "none"` を使用
- ルーチンタスクには安価なモデルを使用した分離cronを検討

---

## 8. トラブルシューティング

### "Nothing runs"
- `cron.enabled` と `OPENCLAW_SKIP_CRON` を確認
- Gatewayが連続して実行されていることを確認（cronはGatewayプロセス内で実行）
- cronスケジュールの場合、タイムゾーン（`--tz`）とホストタイムゾーンを確認

### Telegramが間違った場所に配信される
- フォーラムトピックには `-100...:topic:` を使用して明確にする

---

## 📎 参考リンク

- [Cron vs Heartbeat](https://docs.openclaw.ai/automation/cron-vs-heartbeat)
- [Cron Jobs](https://docs.openclaw.ai/automation/cron-jobs)
- [Heartbeat](https://docs.openclaw.ai/gateway/heartbeat)
