# 新規スライド

このディレクトリには、プレゼンテーション資料が含まれています。

## ディレクトリ構造

- `outline/` - 案だし用フォルダ
  - `outline.md` - スライドのアウトライン
  - `content.md` - スライドのコンテンツ
- `slide/` - スライド用フォルダ
  - `slide.md` - スライドのソースファイル
  - `fonts/` - スライドで使用するフォント
  - `images/` - スライドで使用する画像
- `output/` - 出力用フォルダ（生成されたスライド）
  - `html/` - HTML 形式のスライド
  - `pdf/` - PDF 形式のスライド
  - `pptx/` - PowerPoint 形式のスライド

## スライドの生成方法

スライドを生成するには、リポジトリのルートディレクトリで以下のコマンドを実行します：

```bash
# HTMLとして出力
npx @marp-team/marp-cli slides/new-slide/slide/slide.md --html -o slides/new-slide/output/html/slide.html

# PDFとして出力
npx @marp-team/marp-cli slides/new-slide/slide/slide.md --pdf -o slides/new-slide/output/pdf/slide.pdf

# PowerPointとして出力
npx @marp-team/marp-cli slides/new-slide/slide/slide.md --pptx -o slides/new-slide/output/pptx/slide.pptx
```
