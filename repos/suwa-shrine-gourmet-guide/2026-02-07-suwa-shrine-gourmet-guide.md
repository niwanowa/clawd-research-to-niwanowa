---
layout: default
title: "suwa-shrine-gourmet-guide"
parent: Repositories
date: 2026-02-07
---

# suwa-shrine-gourmet-guide

## 概要

| 項目 | 内容 |
|------|------|
| **所有者** | @niwanowa |
| **リポジトリ** | suwa-shrine-gourmet-guide |
| **言語** | HTML |
| **URL** | [https://github.com/niwanowa/suwa-shrine-gourmet-guide](https://github.com/niwanowa/suwa-shrine-gourmet-guide) |
| **作成日** | 2026-01-11 |
| **最終更新** | 2026-01-15 |

## 説明

札幌市の諏訪神社周辺の高評価ランチ・カフェ情報と、1月11日に実施されているキャンペーン情報をまとめたウェブサイトです。和モダンなデザインで、GitHub Pagesで公開されています。

公開URL: https://niwanowa.github.io/suwa-shrine-gourmet-guide/

## 主な機能

- 高評価ランチ・カフェの情報表示（10店舗以上）
- ジャンル別フィルター機能
- 各店舗の評価、営業時間、価格帯、距離情報
- 1月11日のキャンペーン情報（鏡開き、マッキントショップ）
- レスポンシブデザイン対応

## 技術スタック

### フロントエンド
- React 19
- Vite
- Tailwind CSS 4

### UIコンポーネント
- shadcn/ui

### ルーティング
- wouter

### 公開先
- GitHub Pages

## プロジェクト構成

```
suwa-shrine-gourmet-guide/
├── client/
│   ├── public/
│   │   └── images/          # 画像ファイル
│   └── src/
│       ├── pages/
│       │   └── Home.tsx     # メインページ
│       ├── components/
│       │   ├── HeroSection.tsx
│       │   ├── RestaurantCard.tsx
│       │   └── CampaignSection.tsx
│       ├── lib/
│       │   ├── restaurants.ts    # 店舗データ
│       │   └── campaigns.ts      # キャンペーンデータ
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── vite.config.ts
├── package.json
├── index.html
├── assets/
├── PROJECT_GUIDE.md
└── GITHUB_PAGES_SETUP.md
```

## 使い方

### 前提条件

- Node.js 18以上
- pnpm

### インストール

```bash
git clone https://github.com/niwanowa/suwa-shrine-gourmet-guide.git
cd suwa-shrine-gourmet-guide
pnpm install
```

### ローカル開発

```bash
pnpm dev
```

### ビルド（GitHub Pages用）

```bash
GITHUB_PAGES=true pnpm build
```

### デプロイ

distフォルダの内容をリポジトリのrootに配置してからプッシュ：

```bash
cp -r dist/* .
git add -A
git commit -m "Update site"
git push origin main
```

## デザイン方針

- スタイル：和モダン・ミニマリズム
- メインカラー：深紺色（#1a3a52）
- アクセントカラー：朱色（#d4512f）
- 背景色：淡いアイボリー
- フォント：Noto Serif JP（見出し）、Noto Sans JP（本文）
- 特徴：鳥居モチーフ、毛筆装飾、札形のカード

## 開発状況

| ステータス | 内容 |
|-----------|------|
| **開発状況** | 完了 |
| **次のステップ** | 機能改善 |

## 資料・ドキュメント

- [PROJECT_GUIDE.md](https://github.com/niwanowa/suwa-shrine-gourmet-guide/blob/main/PROJECT_GUIDE.md)
- [GITHUB_PAGES_SETUP.md](https://github.com/niwanowa/suwa-shrine-gourmet-guide/blob/main/GITHUB_PAGES_SETUP.md)
- [GitHub Pages 公式ドキュメント](https://pages.github.com/)

## 関連リンク

- [Vite 公式ドキュメント](https://vitejs.dev/)
- [React 19 ドキュメント](https://react.dev/)
- [Tailwind CSS 4 ドキュメント](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
