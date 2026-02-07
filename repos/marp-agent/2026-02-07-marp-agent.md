---
layout: default
title: "marp-agent"
parent: Repositories
date: 2026-02-07
---

# marp-agent

## 概要

| 項目 | 内容 |
|------|------|
| **所有者** | @niwanowa (元: @minorun365) |
| **リポジトリ** | marp-agent |
| **言語** | TypeScript |
| **URL** | [https://github.com/niwanowa/marp-agent](https://github.com/niwanowa/marp-agent) |
| **作成日** | 2026-01-29 |
| **最終更新** | 2026-01-29 |

## 説明

パワポ作るマン - AIを使ってプレゼンテーション資料を自動生成するWebアプリケーションです。AWSの最新サービスを活用し、フルサーバーレスで構築されています。

Webアプリ: https://pawapo.minoruonda.com/

## 主な機能

- AIによるプレゼンテーション資料の自動生成
- テーマに基づいたスライドの作成
- Web検索機能（Tavily API連携）
- AWSフルサーバーレスアーキテクチャ

## 技術スタック

### フロントエンド
- React
- Vite

### バックエンド
- AWS Lambda
- Amazon Bedrock (Claude)

### インフラ・ツール
- AWS Amplify
- AWS CDK
- Docker

## プロジェクト構成

```
marp-agent/
├── client/          # フロントエンドコード
├── server/          # バックエンドコード
├── shared/          # 共有コード
├── assets/          # アセットファイル
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 使い方

### 前提条件

- ARMアーキテクチャのPC（MacBookなど）
- Node.js 18以上
- Docker Desktop（起動しておく）
- AWSアカウント（バージニア/オレゴン/東京のいずれか）
- BedrockプレイグランドからClaudeのユースケース送信済み
- [Tavily](https://tavily.com/) APIキー

### インストール

```bash
git clone --single-branch https://github.com/niwanowa/marp-agent.git
cd marp-agent
npm install
```

### 環境変数の設定

プロジェクトルートに `.env` ファイルを作成：

```bash
TAVILY_API_KEY=tvly-xxxxx
```

レートリミット対策で複数キーを使う場合は `TAVILY_API_KEY2`, `TAVILY_API_KEY3` も追加可能。

### sandbox環境で起動（ローカル開発）

```bash
aws login
npx ampx sandbox
```

初回はCloudFormationスタックの作成に数分かかります。完了すると `amplify_outputs.json` が生成されます。

別ターミナルでフロントエンドを起動：

```bash
npm run dev
```

### 本番環境へのデプロイ（Amplify Console）

1. AWSマネコンでAmplifyアプリを作成
2. GitHubリポジトリをAmplify Consoleに接続
3. **ビルドイメージを変更**（Docker対応のため）：
   - Build settings → Build image settings → Custom Build Image
   - `public.ecr.aws/codebuild/amazonlinux-x86_64-standard:5.0`
4. **環境変数を設定**：
   - `TAVILY_API_KEY` = 取得したAPIキー
5. デプロイを実行

## 開発状況

| ステータス | 内容 |
|-----------|------|
| **開発状況** | 完了 |
| **次のステップ** | 機能改善 |

## 資料・ドキュメント

- [README](https://github.com/niwanowa/marp-agent)
- [参考ブログ: Amplify & AgentCoreのAIエージェントをAWS CDKでデプロイしよう！ - Qiita](https://qiita.com/minorun365/items/0b4a980f2f4bb073a9e0)

## 関連リンク

- [Tavily API](https://tavily.com/)
- [Marp](https://marp.app/)
