---
marp: true
theme: default
paginate: true
header: "生成AI入門"
style: |
  @font-face {
    font-family: 'Uzura';
    src: url('../../../fonts/uzura.ttf') format('truetype');
  }
  section {
    font-family: 'Uzura', sans-serif !important;
    padding-top: 50px;
  }
  h1, h2, p, li, table {
    font-family: 'Uzura', sans-serif !important;
  }
  h1 {
    color: #2c3e50;
    margin-top: 10px;
    padding-top: 10px;
  }
  section.title h1 {
    font-size: 4em;
    text-align: center;
    margin-top: 2em;
  }
  section.title h2 {
    font-size: 2em;
    text-align: center;
  }
  section.section-title h1 {
    font-size: 3.5em;
    text-align: center;
    margin-top: 2em;
  }
  h2 {
    color: #34495e;。
    margin-top: 20px;
  }
  header {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
  }
  .profile {
    display: flex;
    align-items: center;
  }
  .profile-text {
    margin-left: 2em;
  }
  table {
    margin-top: 1em;
    font-size: 0.9em;
  }
  table td {
    padding: 0.5em;
  }
  blockquote {
    margin-top: 1em;
    font-size: 0.9em;
    color: #666;
  }
---

# 生成 AI 入門

## 〜今日から使える AI サービス〜

---

# 目次

1. 生成 AI とは？
   - 従来の AI と生成 AI の違い
   - なぜ最近注目されているのか
2. 便利な生成 AI サービスの紹介
   - テキスト生成系
   - 画像系
   - AI 検索エンジン
   - その他のサービス

---

# 自己紹介

![bg right:30% 80%](https://placehold.jp/300x400.png)

## プロフィール

- 名前：**\_**
- 所属：**\_**

## 経歴

- 前職：**\_**

## 最近ハマってる曲・アーティスト

- 曲：**\_**
- アーティスト：**\_**

---

# 1. 生成 AI とは？

---

# 1. 生成 AI とは？ (1/2)

![bg right:40% 80%](https://placehold.jp/400x300.png)

## 従来の AI と生成 AI の違い

**従来の AI とは**

- データの「分類」「判断」が主
- 例：画像認識（犬か猫かを判断）、スパムメール判定
- 線形回帰などの統計手法を用いて、データの傾向を予測

> 小話：twitterbot とか、競馬、競艇の予測 AI とか

---

# 1. 生成 AI とは？ (2/2)

![bg right:40% 80%](https://placehold.jp/400x300.png)

## 従来の AI と生成 AI の違い

**生成 AI とは**

- 新しいコンテンツを「生成」
- 大量のデータから学習し、人間らしい出力が可能
- Transformer や Diffusion モデルなどの深層学習技術を活用

> 小話：生成 AI の学習には膨大なコストが必要
> ChatGPT3.5 で約 64 億円、GPT-4 で約 140 億円以上と言われている...

---

# なぜ今、生成 AI が注目されているのか？

![bg right:30% 80%](https://placehold.jp/300x400.png)

- **GPT-3.5 の登場** (2022 年 11 月)

  - 誰でも簡単に利用可能に
  - 自然な対話が実現

- **ビジネス活用の加速**
  - RAG 技術による社内知識活用
  - カスタマーサポート

---

# 2. 便利な生成 AI サービスの紹介

---

# 2-1. テキスト生成 AI

| サービス | 料金                                           | 特徴                                                                                                |
| -------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ChatGPT  | 無料<br>Plus: 3,000 円/月<br>Pro: 34,000 円/月 | ・最新モデル: GPT-4o 3 mini (01/31 公開)<br>・最もポピュラーで基準になりがち                        |
| Gemini   | 無料<br>Advanced: 2,900 円/月                  | ・最新モデル: Gemini 2.0 Flash (02/06 公開)<br>・お固めの文章を返しがち<br>・不足情報をきちんと指摘 |
| Claude   | 無料<br>Pro: 3,000 円/月                       | ・最新モデル: Claude 3.5 sonnet (10/26 公開)<br>・性格が良い印象<br>・コーディングが特に得意        |

---

DeepSeek

- 無料
- 今年出たダークホース
- ちょっと人に話するとおっ知ってるねぇってなれるかも？
- 出力が使い勝手がすごいということは特段ないけど何がすごいかで 30 分くらい語れるけどここに記すには余白が狭すぎる...

---

# 2-2. 画像生成 AI

## 主要サービス比較

| サービス         | 特徴                                                                                    | 得意分野                     |
| ---------------- | --------------------------------------------------------------------------------------- | ---------------------------- |
| Midjourney       | ・油断するとなんでも擬人化して女の子にしてくる<br>・アート性の高い生成が得意            | アート作品<br>イラスト       |
| DALL-E           | ・女の子のイラストは不得意<br>・フォーマルな画像生成が得意                              | ビジネス用途<br>写真風画像   |
| Stable Diffusion | ・油断するとなんでも擬人化して女の子にしてくる<br>・Chrome 拡張機能で画像の微修正が可能 | カスタマイズ<br>ローカル実行 |

> 画像生成の他にも音声生成、動画生成も発達中

---

# 2-3. AI 検索エンジン

- 代理でググってある程度まとめて教えてくれる
- ChatGPT や Gemini の Web 検索オプションと同様の機能

  > 小話：ChatGPT や Gemini のトレーニングデータには過去のデータしか入っていないため、検索オプションが必要

---

# 2-3. AI 検索エンジン

## 主要サービス比較

| サービス   | 特徴                                                                                           | おすすめポイント               |
| ---------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| Perplexity | ・この分野の先駆者<br>・貸借対照表、損益計算書などの財務情報閲覧機能<br>・参照サイトを限定可能 | 財務分析<br>技術調査           |
| Genspark   | ・Beta 期間中は全機能・全モデルが利用可能<br>・無料で試すならおすすめ                          | 無料トライアル                 |
| Felo AI    | ・日本発のサービス<br>・検索結果を PowerPoint に出力可能<br>・フォルダ管理機能あり             | プレゼン資料作成<br>日本語対応 |

---

# その他の便利なサービス

![bg right:40% 80%](https://placehold.jp/400x300.png)

## NotebookLM

- AI パワードメモ帳
- ドキュメントの要約・分析
- メモの補足・肉付け機能

## Canva

- AI デザインアシスト
- プレゼン作成に特化
- PowerPoint テンプレート活用

---

# 以上。
