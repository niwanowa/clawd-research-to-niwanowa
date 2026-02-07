# Niwa Grass Grower

GitHubのContributions（草）を育てるためのツールです。
直近1年間のContributionsを取得し、活動がない日に自動的にコミットを作成します。

## 必要要件

- Python 3.x
- Git

## インストール

Poetryを使用して依存ライブラリをインストールします。

```bash
poetry install
```

## 使い方

1. このリポジトリでスクリプトを実行します。

```bash
poetry run python grow_grass.py <あなたのGitHubユーザー名>
```

**オプション:**
- `--dry-run`: 実際にはコミットを行わず、何が行われるかを表示します。
- `--max-commits`: 1日あたりの最大コミット数（デフォルト: 5）。

例:
```bash
poetry run python grow_grass.py niwanowa --dry-run
```

2. 生成されたコミットをGitHubの**Private**リポジトリにプッシュします。

```bash
git push origin main
```

**注意:**
Privateリポジトリの活動を公開プロフィールに表示するには、GitHubのプロフィール設定で「Private contributions」を有効にする必要があります。
