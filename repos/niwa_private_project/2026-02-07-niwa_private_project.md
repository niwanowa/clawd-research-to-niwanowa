---
layout: default
title: "niwa_private_project"
parent: Repositories
date: 2026-02-07
---

# niwa_private_project

## 概要

| 項目 | 内容 |
|------|------|
| **所有者** | @niwanowa |
| **リポジトリ** | niwa_private_project |
| **言語** | Python |
| **URL** | [https://github.com/niwanowa/niwa_private_project](https://github.com/niwanowa/niwa_private_project) |
| **作成日** | 2025-12-13 |
| **最終更新** | 2026-01-30 |

## 説明

Niwa Grass Grower - GitHubのContributions（草）を育てるためのツールです。直近1年間のContributionsを取得し、活動がない日に自動的にコミットを作成します。

## 主な機能

- GitHubのContributionsグラフから活動がない日を検出
- 指定した日付範囲で空いている日付にダミーコミットを作成
- 1日あたりの最大コミット数を設定可能
- ドライラン機能で実際のコミット前に確認可能

## 技術スタック

### バックエンド
- Python 3.x

### インフラ・ツール
- Git
- Poetry（依存管理）

## プロジェクト構成

```
niwa_private_project/
├── grow_grass.py      # メインスクリプト
├── pyproject.toml     # Poetry設定ファイル
└── README.md
```

## 使い方

### 前提条件

- Python 3.x
- Git
- Poetry

### インストール

```bash
git clone https://github.com/niwanowa/niwa_private_project.git
cd niwa_private_project
poetry install
```

### 実行

```bash
poetry run python grow_grass.py <あなたのGitHubユーザー名>
```

**オプション:**

- `--dry-run`: 実際にはコミットを行わず、何が行われるかを表示
- `--max-commits`: 1日あたりの最大コミット数（デフォルト: 5）

**例:**

```bash
poetry run python grow_grass.py niwanowa --dry-run
```

### GitHubへの反映

生成されたコミットをGitHubの**Private**リポジトリにプッシュします：

```bash
git push origin main
```

**注意:**
Privateリポジトリの活動を公開プロフィールに表示するには、GitHubのプロフィール設定で「Private contributions」を有効にする必要があります。

## 開発状況

| ステータス | 内容 |
|-----------|------|
| **開発状況** | 完了 |
| **次のステップ** | なし |

## 資料・ドキュメント

- [README](https://github.com/niwanowa/niwa_private_project/blob/main/README.md)
- [GitHub Contributions API](https://docs.github.com/en/rest/reference/activity)

## 関連リンク

- [GitHub Private Contributions](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile)
