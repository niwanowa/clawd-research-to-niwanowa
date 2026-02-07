# 札幌諏訪神社周辺グルメガイド - プロジェクト実行ガイド

## プロジェクト概要

このプロジェクトは、札幌市の諏訪神社周辺の高評価ランチ・カフェ情報と、1月11日に実施されているキャンペーン情報をまとめたウェブサイトです。GitHub Pagesで公開されています。

**公開URL**: https://niwanowa.github.io/suwa-shrine-gourmet-guide/

---

## 最初の指示に含めるべき内容

このプロジェクトを効率的に実行するために、最初の指示に以下の内容を含めることをお勧めします。

### 1. **プロジェクト要件の明確化**

```
【プロジェクト要件】
- 対象地域：札幌市の諏訪神社周辺
- コンテンツ：高評価のランチ店、カフェ情報（10店舗以上）
- 特別情報：1月11日に実施されているキャンペーン情報
- 公開方法：GitHub Pages
- デプロイ方法：distフォルダの内容をリポジトリのrootに配置
```

### 2. **デザイン方針の指定**

```
【デザイン方針】
- スタイル：和モダン・ミニマリズム
- メインカラー：深紺色（#1a3a52）
- アクセントカラー：朱色（#d4512f）
- 背景色：淡いアイボリー
- フォント：Noto Serif JP（見出し）、Noto Sans JP（本文）
- 特徴：鳥居モチーフ、毛筆装飾、札形のカード
```

### 3. **技術スタック**

```
【技術仕様】
- フレームワーク：React 19 + Vite
- スタイリング：Tailwind CSS 4
- UIコンポーネント：shadcn/ui
- ルーティング：wouter
- 公開先：GitHub Pages（サブパス対応）
```

### 4. **GitHub Pages設定の詳細**

```
【GitHub Pages設定】
- ブランチ：main
- フォルダ：/ (root)
- base href：/suwa-shrine-gourmet-guide/
- 重要：distフォルダの内容をリポジトリのrootに配置してからプッシュ
```

### 5. **クレジット情報の要件**

```
【クレジット情報】
- 配置位置：ページの最上部
- 内容：「このページは [作成日] に Manus で作成されました」
- デザイン：淡いグラデーション背景、控えめなテキストカラー
- 重要：デザインを崩さないように実装
```

### 6. **コンテンツ要件**

```
【必須コンテンツ】
1. ヒーロー画像：諏訪神社の冬景色
2. キャンペーン情報セクション：
   - 鏡開き（1月11日の伝統行事）
   - 大丸札幌店マッキントッシュ POP-UP SHOP（1月11日最終日）
3. 飲食店情報：
   - 最低10店舗の高評価ランチ・カフェ
   - ジャンル別フィルター機能
   - 各店舗の評価、営業時間、価格帯、距離情報
4. 神社情報：
   - 所在地、電話番号、参拝時間
```

### 7. **開発フロー**

```
【推奨開発フロー】
1. webdev_init_projectでプロジェクト初期化
2. デザイン案（ideas.md）を作成・確認
3. 飲食店情報を調査・整理
4. コンポーネント実装（HeroSection、RestaurantCard、CampaignSection）
5. ページ構築（Home.tsx）
6. ビルド：GITHUB_PAGES=true npm run build
7. distフォルダの内容をrootに配置
8. git add -A && git commit && git push
9. GitHub Pages設定確認
```

### 8. **よくある問題と解決方法**

```
【404エラーが発生する場合】
- 原因1：distフォルダがGitにコミットされていない
  → .gitignoreからdist/を削除し、distフォルダをコミット
  
- 原因2：GitHub Pages設定でフォルダが「/ (root)」になっていない
  → Settings → Pages で Folder を「/ (root)」に設定
  
- 原因3：アセットパスが二重になっている（/suwa-shrine-gourmet-guide/suwa-shrine-gourmet-guide/...）
  → index.htmlのアセットパスを修正するか、distの内容をrootに配置

【ルーティングが失敗する場合】
- 原因：Reactのルーター（wouter）がサブパスに対応していない
- 解決：index.htmlに <base href="/suwa-shrine-gourmet-guide/"> を追加
```

### 9. **ビルド・デプロイコマンド**

```bash
# ビルド（GitHub Pages用）
GITHUB_PAGES=true npm run build

# distの内容をrootに配置
cp -r dist/* .

# Gitにコミット・プッシュ
git add -A
git commit -m "Update with [変更内容]"
git push origin main
```

### 10. **ファイル構造**

```
suwa-shrine-gourmet-guide/
├── client/
│   ├── public/
│   │   └── images/
│   │       ├── hero-shrine.jpg
│   │       ├── cafe-lunch.jpg
│   │       └── kagami-biraki.jpg
│   └── src/
│       ├── pages/
│       │   └── Home.tsx
│       ├── components/
│       │   ├── HeroSection.tsx
│       │   ├── RestaurantCard.tsx
│       │   └── CampaignSection.tsx
│       ├── lib/
│       │   ├── restaurants.ts
│       │   └── campaigns.ts
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── vite.config.ts
├── package.json
├── index.html
├── assets/
└── [その他のビルド出力ファイル]
```

---

## 実装のポイント

### デザイン実装

1. **グローバルスタイル**
   - `client/src/index.css` でカラーパレットを定義
   - Tailwind CSS 4のOKLCカラーフォーマットを使用
   - 深紺（#1a3a52）と朱色（#d4512f）をテーマカラーとして設定

2. **コンポーネント設計**
   - HeroSection：ヒーロー画像と鳥居モチーフ
   - CampaignSection：キャンペーン情報を視覚的に表示
   - RestaurantCard：店舗情報を札形のカードで表示
   - ジャンル別フィルター機能を実装

3. **レスポンシブ対応**
   - モバイル、タブレット、デスクトップに対応
   - Tailwind CSSのブレークポイントを活用

### データ管理

1. **restaurants.ts**
   - 店舗情報をTypeScriptで定義
   - 評価、営業時間、価格帯、距離情報を含める

2. **campaigns.ts**
   - キャンペーン情報をデータ化
   - 日付、場所、説明を構造化

### GitHub Pages対応

1. **Vite設定**
   ```typescript
   export default defineConfig({
     base: process.env.GITHUB_PAGES ? '/suwa-shrine-gourmet-guide/' : '/',
     // ...
   });
   ```

2. **index.html設定**
   ```html
   <base href="/suwa-shrine-gourmet-guide/">
   ```

3. **App.tsx設定**
   - wouter のルーターにbasePathを指定（必要に応じて）

---

## 今後の改善案

1. **Google Maps統合** - 各店舗の詳細ページに地図を追加
2. **営業時間リアルタイム表示** - 本日営業中かどうかを自動判定
3. **ユーザーレビュー機能** - 訪問者が店舗の感想を投稿・閲覧
4. **多言語対応** - 英語、中国語などの言語サポート
5. **SEO最適化** - メタタグの最適化、構造化データの追加

---

## 参考リンク

- [GitHub Pages公式ドキュメント](https://pages.github.com/)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [React 19ドキュメント](https://react.dev/)
- [Tailwind CSS 4ドキュメント](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

## 作成日

2026年1月11日

## 作成者

Manus AI Agent
