# HEARTBEAT.md

## 起動挨拶チェック
- `memory/heartbeat-state.json` の `startupAnnounced` を確認
- もし `false` または存在しない場合：Slack C0ABC66S869 に「おはようございます！Clawdbotがオンラインになりました 🤖」と送信し、`startupAnnounced: true` に更新

## 注意
- Gateway再起動後にこのフラグをリセットするには、手動で `startupAnnounced: false` に戻すか、ファイルを削除する必要がある
