---
layout: default
title: "PicoClaw - $10ハードウェアで動く超軽量AIアシスタント"
parent: ドキュメント・翻訳
date: 2026-02-10
---

# PicoClaw - $10ハードウェアで動く超軽量AIアシスタント

**作成日:** 2026-02-10
**タイプ:** ドキュメント翻訳
**元ソース:**
- [X ポスト](https://x.com/sipeedio/status/2020832292885930288)
- [GitHub: sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

## 📝 概要

PicoClawは、$10のハードウェアと10MB未満のRAMで動作する超軽量のパーソナルAIアシスタントです。Go言語で実装され、OpenClawのコア機能をわずか1%のコードと1%のメモリで再現しています。RISC-V、ARM、x86アーキテクチャをサポートし、Linuxが動くあらゆるデバイスでAIエージェントを実行可能です。

---

## 📄 内容

### X ポスト翻訳

> **原文 (@SipeedIO):**
>
> #PicoClaw: AI built the code in hours, matching #OpenClaw's core features with only 1% code and 1% memory! Ditch your Mac Mini—now you can run a full AI assistant on $10 RISCV hardware with 10MB RAM~ If it runs Linux, it can now be your personal AI Agent!
>
> **日本語訳:**
>
> #PicoClaw: AIが数時間でコードを構築し、#OpenClawのコア機能をわずか1%のコードと1%のメモリで再現！Mac Miniはもういらない—今や$10のRISC-Vハードウェアと10MB RAMで完全なAIアシスタントを実行できます〜Linuxが動くなら、あなただけのパーソナルAIエージェントになれる！

---

### GitHubリポジトリ概要

#### 主な特徴

| 特徴 | 説明 |
|------|------|
| **🪶 超軽量** | メモリ使用量 <10MB — Clawdbotコア機能の99%未満 |
| **💰 低コスト** | $10のハードウェアで実行可能 — Mac miniより98%安い |
| **⚡️ 超高速起動** | 起動時間 <1秒（0.6GHzシングルコアで） |
| **🌍 真のポータビリティ** | RISC-V、ARM、x86で単一バイナリ、ワンクリックで実行 |
| **🤖 AIブートストラップ** | AIエージェント自身がアーキテクチャ移行とコード最適化を主導 |

#### 他プロジェクトとの比較

| プロジェクト | 言語 | RAM | 起動時間（0.8GHzコア） | コスト |
|------------|------|-----|----------------------|--------|
| OpenClaw | TypeScript | >1GB | >500秒 | Mac Mini $599 |
| NanoBot | Python | >100MB | >30秒 | Linux SBC ~$50 |
| **PicoClaw** | **Go** | **<10MB** | **<1秒** | **Linux Board ~$10** |

#### 対応ハードウェア

- **$9.9** [LicheeRV-Nano](https://www.aliexpress.com/item/1005006519668532.html) — 最小限のホームアシスタント用
- **$30〜50** [NanoKVM](https://www.aliexpress.com/item/1005007369816019.html) — 自動サーバー保守用
- **$50** [MaixCAM](https://www.aliexpress.com/item/1005008053333693.html) / **$100** [MaixCAM2](https://www.kickstarter.com/projects/zepan/maixcam2-build-your-next-gen-4k-ai-camera) — スマート監視用

#### 対応チャットアプリ

| チャンネル | セットアップ |
|---------|------------|
| Telegram | 簡単（トークンのみ） |
| Discord | 簡単（ボットトークン + インテント） |

#### 対応プロバイダー

| プロバイダー | 用途 | 無料枠 |
|------------|------|-------|
| OpenRouter | LLM（複数モデル対応） | 200K tokens/月 |
| Zhipu | LLM（中国ユーザー向け） | 200K tokens/月 |
| Brave Search | Web検索 | 2000クエリ/月 |
| Groq | LLM + 音声認識（Whisper） | 無料枠あり |
| OpenAI | GPT直接入力 | - |
| Anthropic | Claude直接入力 | - |
| Gemini | Gemini直接入力 | - |
| DeepSeek | DeepSeek直接入力 | - |

#### クイックスタート

1. **初期化**
   ```bash
   picoclaw onboard
   ```

2. **設定** (`~/.picoclaw/config.json`)
   ```json
   {
     "agents": {
       "defaults": {
         "workspace": "~/.picoclaw/workspace",
         "model": "glm-4.7",
         "max_tokens": 8192,
         "temperature": 0.7,
         "max_tool_iterations": 20
       }
     },
     "providers": {
       "zhipu": {
         "api_key": "Your API Key",
         "api_base": "https://open.bigmodel.cn/api/paas/v4"
       }
     },
     "tools": {
       "web": {
         "search": {
           "api_key": "YOUR_BRAVE_API_KEY",
           "max_results": 5
         }
       }
     }
   }
   ```

3. **チャット開始**
   ```bash
   picoclaw agent -m "What is 2+2?"
   ```

#### CLIコマンド

| コマンド | 説明 |
|---------|------|
| `picoclaw onboard` | 設定とワークスペースの初期化 |
| `picoclaw agent -m "..."` | エージェントとチャット |
| `picoclaw agent` | インタラクティブチャットモード |
| `picoclaw gateway` | ゲートウェイの起動 |
| `picoclaw status` | ステータス表示 |

---

## 📎 参考リンク

- [X ポスト](https://x.com/sipeedio/status/2020832292885930288)
- [GitHub: sipeed/picoclaw](https://github.com/sipeed/picoclaw)
- [LicheeRV-Nano (AliExpress)](https://www.aliexpress.com/item/1005006519668532.html)
- [Discord コミュニティ](https://discord.gg/V4sAZ9XWpN)
