---
layout: default
title: "niwanowa-slides"
parent: Repositories
date: 2026-02-07
---

# niwanowa-slides

## 概要

| 項目 | 内容 |
|------|------|
| **所有者** | @niwanowa |
| **リポジトリ** | niwanowa-slides |
| **言語** | HTML |
| **URL** | [https://github.com/niwanowa/niwanowa-slides](https://github.com/niwanowa/niwanowa-slides) |
| **作成日** | 2025-02-11 |
| **最終更新** | 2025-05-25 |

## 説明

様々なトピックのプレゼンテーションスライド集です。生成AI入門など、技術系トピックのスライドを管理しています。

## 主な機能

- Marpを使用したスライドの作成・管理
- HTML/PDF/PowerPoint形式での出力
- アウトラインとスライドの分離管理

## 技術スタック

### ドキュメント
- [Marp](https://marp.app/)
- Markdown

### ツール
- Node.js
- npm

## プロジェクト構成

```
niwanowa-slides/
├── slides/              # スライド集のルートディレクトリ
│   └── [slide-name]/    # 各スライドのディレクトリ（例：generative-ai）
│       ├── README.md     # スライドの説明
│       ├── outline/      # 案だし用フォルダ
│       │   ├── outline.md     # アウトライン
│       │   └── content.md     # コンテンツ
│       ├── slide/        # スライド用フォルダ
│       │   ├── slide.md     # スライドのソースファイル
│       │   ├── fonts/       # フォントファイル
│       │   └── images/      # 画像ファイル
│       └── output/       # 生成されたスライド（出力用フォルダ）
│           ├── html/    # HTML形式
│           ├── pdf/     # PDF形式
│           └── pptx/    # PowerPoint形式
├── readme.md
└── .gitignore
```

## 使い方

### 前提条件

- Node.js
- npm

### セットアップ

```bash
git clone https://github.com/niwanowa/niwanowa-slides.git
cd niwanowa-slides
npm install
```

### スライドの生成

各スライドディレクトリ内の README ファイルに、スライド生成方法の詳細が記載されています。

**現在登録されているスライド:**

1. [生成 AI 入門](./slides/generative-ai/README.md) - 生成 AI の基礎と実用的なサービスの紹介

## 開発状況

| ステータス | 内容 |
|-----------|------|
| **開発状況** | メンテナンス |
| **次のステップ** | 新しいスライドの追加 |

## 資料・ドキュメント

- [Marp 公式ドキュメント](https://marp.app/)
- [readme.md](https://github.com/niwanowa/niwanowa-slides/blob/main/readme.md)

## 関連リンク

- [Marp CLI](https://github.com/marp-team/marp-cli)
