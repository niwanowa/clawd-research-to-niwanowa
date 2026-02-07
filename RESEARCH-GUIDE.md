# 調査運用ガイドライン

## 📁 フォルダ構成

```
reports/
├── daily/           # 日次トレンド調査
├── tech-trends/     # 定期的なトレンド調査
├── research/        # 特定技術の深掘り調査
├── gourmet/         # グルメ情報
├── events/          # イベント情報
├── clawdbot-diary/  # Clawdbotの日報
└── docs/            # ドキュメント・翻訳

templates/           # 各調査タイプのテンプレート
├── daily.md
├── tech-trends.md
├── research.md
├── tool-review.md
├── gourmet.md
├── events.md
└── clawdbot-diary.md
```

## 📝 ファイル命名規則

`YYYY-MM-DD-タイトル.md`

例:
- `2026-02-02-qiita-zenn-trends.md`
- `2026-02-02-claude-api-deep-dive.md`
- `2026-02-02-shibuya-lunch.md`

## 📄 Front Matter

各レポートには以下のfront matterを必ず含める：

```yaml
---
layout: default
title: "レポートタイトル"
parent: Daily Reports  # または Research
date: YYYY-MM-DD       # 調査日（日付でソートに使用）
---
```

**重要:** `date` フィールドは一覧表示のソートと日付表示に使用される。`nav_order` は不要。

## 🔄 調査ワークフロー

調査依頼を受けたら、以下の手順で実行する：

### Step 1: 調査タイプの判定
既存のテンプレートに該当するか確認：
- **daily** - 日次のトレンドチェック（Qiita/Zenn等）
- **tech-trends** - 定期的なトレンド調査
- **research** - 特定技術の深掘り
- **tool-review** - ツール比較・レビュー
- **gourmet** - グルメ情報
- **events** - イベント情報
- **docs** - ドキュメント・翻訳

### Step 2: テンプレート適用または新規作成
- **既存に該当** → `templates/` から該当テンプレートを使用
- **該当なし** → 新規テンプレートを `templates/` に作成

### Step 3: 調査実行 → レポート作成
- テンプレートに則って調査を実施
- 一次ソースを重視
- 適切なフォルダに保存

### Step 4: Git コミット & プッシュ
```bash
git add .
git commit -m "📝 Add report: YYYY-MM-DD-タイトル"
git push
```

### Step 5: GitHub Actionsの完了確認
- プッシュ後、GitHub Actionsのワークフローが正常に完了するのを待つ
- `gh run list` またはGitHub Actionsタブでステータスを確認
- エラーがないことを確認

### Step 6: GitHub Pages上でページの確認
- GitHub Actionsが正常に完了したことを確認（`gh run list` またはGitHub Actionsタブ）
- **必須:** Slackで共有する前に、以下のコマンドでURLが200（成功）であることを確認：

```bash
# URL変数（適切に置き換えて実行）
REPORT_URL="https://niwanowa.github.io/clawd-research-to-niwanowa/reports/{category}/YYYY-MM-DD-タイトル.html"

# 確認コマンド
STATUS=$(curl -I -s -o /dev/null -w "%{http_code}" "$REPORT_URL")
echo "HTTP Status: $STATUS"

# 200以外の場合は共有しない
if [ "$STATUS" != "200" ]; then
    echo "❌ URLが正しくありません（ステータス: $STATUS）"
    echo "URL: $REPORT_URL"
    echo "ファイル名、カテゴリ、拡張子（.html）を確認してください"
    exit 1
else
    echo "✅ URL確認完了（ステータス: 200）"
fi
```

- **重要なチェックポイント:**
  - `HTTP/2 200` または `HTTP/1.1 200 OK` と表示されれば成功
  - `404` や `403` が返ってきた場合、以下を確認：
    - ファイル名（ハイフン、スペースなど）
    - カテゴリ名（`daily`, `research`, `clawdbot-diary` など）
    - 拡張子 `.html` の有無（末尾が `/` で終わると404）

### Step 7: SlackでURL共有（すべてのレポート）
- **前提条件:** Step 6でcurl確認が `200` であること
- **200でない場合は絶対に共有しない** - これが最重要ルール
- レポート作成後、Slackチャンネル `#clawdbotとの対話` (C0ABC66S869) でURLを共有
- 共有メッセージ例：
  - 日報：「日報を更新しました 📝 {URL}」
  - トレンド調査：「トレンド調査を更新しました 📊 {URL}」
  - 深掘り調査：「調査レポートを更新しました 🔍 {URL}」
- **正しいURL構造:** `https://niwanowa.github.io/clawd-research-to-niwanowa/reports/{category}/YYYY-MM-DD-タイトル.html`
  - `{category}` は `daily`, `research`, `clawdbot-diary`, `tech-trends` など
  - **末尾は必ず `.html` 拡張子** - `/` で終わるURLや `.md` は404になります！
- 例:
  - Daily（Qiita/Zennトレンド）: `https://niwanowa.github.io/clawd-research-to-niwanowa/reports/daily/2026-02-05-zenn-trend.html`
  - 日報: `https://niwanowa.github.io/clawd-research-to-niwanowa/reports/clawdbot-diary/2026-02-05-clawdbot-diary.html`
  - 深掘り調査: `https://niwanowa.github.io/clawd-research-to-niwanowa/reports/research/2026-02-05-tool-review.html`

## 📋 テンプレート一覧

| タイプ | テンプレート | 保存先 | 用途 |
|--------|-------------|--------|------|
| Daily | `templates/daily.md` | `reports/daily/` | 日次トレンド |
| Tech Trends | `templates/tech-trends.md` | `reports/tech-trends/` | トレンド調査 |
| Research | `templates/research.md` | `reports/research/` | 深掘り調査 |
| Tool Review | `templates/tool-review.md` | `reports/research/` | ツール比較 |
| Gourmet | `templates/gourmet.md` | `reports/gourmet/` | グルメ情報 |
| Events | `templates/events.md` | `reports/events/` | イベント情報 |
| Clawdbot日報 | `templates/clawdbot-diary.md` | `reports/clawdbot-diary/` | Clawdbotの日報 |
| Docs | `templates/docs.md` | `reports/docs/` | ドキュメント・翻訳 |
