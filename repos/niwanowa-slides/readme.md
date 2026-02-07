# niwanowa-slides

様々なトピックのプレゼンテーションスライド集です。

## スライド一覧

1. [生成 AI 入門](./slides/generative-ai/README.md) - 生成 AI の基礎と実用的なサービスの紹介

## リポジトリ構造

```
niwanowa-slides/
├── slides/                  # スライド集のルートディレクトリ
│   └── [slide-name]/        # 各スライドのディレクトリ（例：generative-ai）
│       ├── README.md        # スライドの説明
│       ├── outline/         # 案だし用フォルダ
│       │   ├── outline.md   # アウトライン
│       │   └── content.md   # コンテンツ
│       ├── slide/           # スライド用フォルダ
│       │   ├── slide.md     # スライドのソースファイル
│       │   ├── fonts/       # フォントファイル
│       │   └── images/      # 画像ファイル
│       └── output/          # 生成されたスライド（出力用フォルダ）
│           ├── html/        # HTML形式
│           ├── pdf/         # PDF形式
│           └── pptx/        # PowerPoint形式
└── .cursor/                 # Cursor IDE設定
    └── git.md               # Gitの使用ルール
```

## 使用方法

各スライドは[Marp](https://marp.app/)を使用して作成されています。

### 必要なツール

- Node.js
- npm

### セットアップ

```bash
npm install
```

### スライドの生成

各スライドディレクトリ内の README ファイルに、スライド生成方法の詳細が記載されています。

## 作者

- [niwanowa](https://github.com/niwanowa)
