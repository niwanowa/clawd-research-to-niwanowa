---
title: "Conductor レビュー"
nav_order: 3
parent: Research
---

# Conductor レビュー

**調査日:** 2026-02-02  
**調査タイプ:** Tool Review  
**カテゴリ:** 開発ツール / AIコーディングエージェント管理

---

## 📋 基本情報

| 項目 | 内容 |
|------|------|
| 名称 | Conductor |
| 公式サイト | [conductor.build](https://www.conductor.build/) |
| 料金体系 | **無料**（ただしClaude Code / Codex のAPIキーまたはサブスクが別途必要） |
| 対応環境 | **macOS専用** |
| 最新バージョン | 0.33.4（2026年2月時点） |

---

## 🎯 何ができるツール？

**複数のAIコーディングエージェント（Claude Code / Codex）を並列で動かし、それぞれを隔離されたワークスペースで管理するMac向けアプリ。** 各エージェントの作業状況を一覧で把握し、変更のレビュー・マージができる「指揮官（Conductor）」ツール。

---

## ⭐ 主要機能

1. **並列エージェント管理** - 複数のClaude Code / Codexを同時に起動し、それぞれ別のタスクを並行して処理させられる
2. **Git worktree ベースの隔離ワークスペース** - 各エージェントはgit worktreeで完全に隔離された環境で作業
3. **変更のレビュー＆マージ** - エージェントが行った変更を一覧で確認し、コードレビュー後にマージ
4. **GitHub連携** - GitHub Issuesのアタッチ、PR作成、GitHub Actionsのログ表示が可能
5. **Linear / Graphite 連携** - Linear認証不要でGitHub issues連携、Graphite stacksにも対応
6. **タスク機能** - Claude がタスクを整理し、長期プロジェクトに対応

---

## 🔧 仕組み

1. **リポジトリを追加** - Conductorがローカルにクローンし、Mac上で完全にローカル動作
2. **エージェントをデプロイ** - Claude Code / Codex をスピンアップ、各エージェントは隔離ワークスペースを持つ
3. **指揮（Conduct）** - 誰が何を作業中か一覧で確認、注意が必要なものをレビュー・マージ

---

## 💰 料金体系

### Conductor 本体
**無料** - Conductor自体に課金はない

### AIエージェントのコスト（別途必要）
Conductorは既存のClaude Code認証を使用：
- **Claude Pro / Max プラン** 利用中 → そのままConductor経由で使用可能
- **APIキー** でログイン中 → そのAPIキーで課金

| Claude プラン | 月額 | Conductor での利用 |
|--------------|------|-------------------|
| Claude Pro | $20/月 | 利用可能（レート制限あり） |
| Claude Max (5x) | $100/月 | 並列エージェント向き |
| Claude Max (20x) | $200/月 | 大規模並列向け |
| API従量課金 | 使用量に応じて | 柔軟だがコスト注意 |

---

## ✅ Good / ❌ Bad

### Good
- 🆓 Conductor自体は無料
- 🖥️ 完全ローカル動作（リポジトリはMac上に保持）
- 🔀 git worktree による確実なワークスペース隔離
- 👀 複数エージェントの並列作業を一覧把握できる
- 🔗 GitHub Issues / Actions との連携が強力
- 📝 タスク機能で長期プロジェクトにも対応
- ⚡ 活発な開発（頻繁なアップデート）

### Bad
- 🍎 **macOS専用** - Windows / Linux ユーザーは利用不可
- 💸 Claude Code のサブスクまたはAPIキーが別途必要
- 🤖 現時点で対応エージェントは Claude Code と Codex のみ
- 📊 並列エージェントを活用するにはMax プラン推奨（$100-200/月）

---

## 🆚 競合ツールとの比較

| 機能 | Conductor | Cursor | Windsurf | Cline (VSCode) |
|------|-----------|--------|----------|----------------|
| 価格 | 無料 + Claude課金 | $20/月〜 | $15/月〜 | 無料 + API課金 |
| 並列エージェント | ✅ 複数同時 | ❌ シングル | ❌ シングル | ❌ シングル |
| ワークスペース隔離 | ✅ worktree | ❌ | ❌ | ❌ |
| macOS | ✅ | ✅ | ✅ | ✅ |
| Windows / Linux | ❌ | ✅ | ✅ | ✅ |
| IDE統合 | 外部（JetBrains等連携） | 専用IDE | 専用IDE | VSCode拡張 |

---

## 🎯 こんな人におすすめ

- **Mac ユーザー**で複数のコーディングタスクを並列で処理したい人
- **Claude Max プラン**を契約済みでフル活用したい人
- 既存IDEを使い続けながら、AIエージェントを**並列管理**したい人
- GitHub中心のワークフローで**PR / Issues 連携**を重視する人

---

## 📝 総評

**おすすめ度:** ⭐⭐⭐⭐☆ (4/5)

Conductorは「複数のAIコーディングエージェントを並列で指揮する」というニッチだが強力なニーズに応えるツール。Conductor自体が無料なのは大きなメリットだが、フル活用するにはClaude Max（$100〜200/月）が事実上必要になる点、macOS専用という制約がある点が減点要素。

既にClaude Max を使っているMacユーザーで、「複数のタスクを同時にAIにやらせたい」という人には非常に魅力的。逆に言えば、シングルタスクで満足している人や、Windows / Linux ユーザーには現時点では選択肢に入らない。

---

## 📎 参考リンク

- [公式サイト](https://www.conductor.build/)
- [Changelog](https://www.conductor.build/changelog)
