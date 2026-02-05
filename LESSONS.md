# 調査運用 - 教訓と改善策

## 📌 2026-02-05: URL 404 件

### 問題点
調査レポートのURLを共有した際、404エラーが発生した。

### 原因
実際の調査で共有したURLが間違っていた。

**実際に共有したURL（404）:**
```
https://niwanowa.github.io/clawd-research-to-niwanowa/daily/2026-02-05-zenn-trend/
```

**正しいURL:**
```
https://niwanowa.github.io/clawd-research-to-niwanowa/reports/daily/2026-02-05-zenn-trend.html
```

**間違っていた点:**
1. `reports/` ディレクトリが抜けていた
2. 末尾が `.html` 拡張子ではなく `/` になっていた

RESEARCH-GUIDE.md のStep 7に誤ったURL構造例が記載されており、これを参考にしてしまった可能性がある。

### ✅ 正しいURL構造
```
https://niwanowa.github.io/clawd-research-to-niwanowa/reports/{category}/{YYYY-MM-DD-title}.html
```
**注意:**
- `{category}` は必須（`daily`, `research`, `clawdbot-diary` など）
- 末尾は **`.html` 拡張子**（`/` で終わるURLは404）
- Jekyllが `.md` を `.html` に変換して公開する

### 🔄 改善策 - 調査フロー強化

RESEARCH-GUIDE.md のStep 6-7をより厳密に実行：

#### Step 6: GitHub Pages上でページの確認（必須）
```bash
# 1. GitHub Actionsの完了確認
gh run list --limit 1

# 2. 実際にURLにアクセスして動作確認
# curl でHTTPステータスを確認
curl -I "https://niwanowa.github.io/clawd-research-to-niwanowa/reports/{category}/{YYYY-MM-DD-title}"

# 期待される出力: HTTP/2 200
# 404 の場合はデプロイがまだ完了していないか、URLが間違っている
```

#### Step 7: SlackでURL共有（日報の場合のみ）
**Slack共有前のチェックリスト:**
- [ ] GitHub Actionsが正常完了しているか
- [ ] curlでURLにアクセスして200 OKを確認したか
- [ ] URLに `.md` や `.html` が含まれていないか
- [ ] ブラウザで実際にページが表示されるか

**チェックOK後のみ共有する**

### 📝 共有メッセージ例
```
日報を更新しました 📝
https://niwanowa.github.io/clawd-research-to-niwanowa/reports/clawdbot-diary/YYYY-MM-DD-clawdbot-diary/
```

---

## 今後の調査作業の心得

### 時間をかけてでも確認する
- Git push → GitHub Actions完了 → URL確認 → 共有
- 各ステップをスキップしない

### 一次ソース（実物）を確認する
- 「見えているはず」ではなく「実際にアクセスして確認」
- web_fetch や curl で機械的に確認する

### エラーがあったら即報告・即修正
- 404を指摘されたら、即座に調査と修正
- 「推測」ではなく「事実」に基づいて対応する

---

*最終更新: 2026-02-05*
