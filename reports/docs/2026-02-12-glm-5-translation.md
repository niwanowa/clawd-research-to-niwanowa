# GLM-5: From Vibe Coding to Agentic Engineering - 翻訳

**調査日:** 2026-02-12  
**元URL:** https://z.ai/blog/glm-5  
**OpenClawドキュメント:** https://docs.z.ai/devpack/tool/openclaw

---

## 📝 翻訳

### GLM-5: Vibe CodingからAgentic Engineeringへ

私たちは、複雑なシステムエンジニアリングと長期的なエージェントタスクをターゲットとしたGLM-5をリリースしています。スケーリングは、汎用人工知能（AGI）の知能効率を向上させる最も重要な方法の一つです。GLM-4.5と比較して、GLM-5はパラメータ数を355B（アクティブ32B）から744B（アクティブ40B）にスケールし、事前学習データを23Tトークンから28.5Tトークンに増加させました。GLM-5はDeepSeek Sparse Attention（DSA）も統合しており、長文脈絡能力を維持しながらデプロイコストを大幅に削減しています。

強化学習は、事前学習モデルの能力と卓越性のギャップを埋めることを目的としています。しかし、LLMでの大規模展開はRLトレーニングの非効率性が課題となっています。そこで私たちは、トレーニングスループットと効率を大幅に向上させ、より細かい事後学習の反復を可能にする新しい**非同期RLインフラストラクチャ「slime」**を開発しました。事前学習と事後学習の双方の進歩により、GLM-5は広範な学術ベンチマークでGLM-4.7と比較して大幅な改善を達成し、推論、コーディング、エージェントタスクで世界の全オープンソースモデルの中で最高クラスのパフォーマンスを達成し、フロンティアモデルとのギャップを狭めています。

GLM-5は、複雑なシステムエンジニアリングと長期的なエージェントタスク用に設計されています。内部評価スイートCC-Bench-V2で、GLM-5はフロントエンド、バックエンド、長期的なタスクでGLM-4.7を大幅に上回り、Claude Opus 4.5とのギャップを狭めています。

**Vending Bench 2**（長期運用能力を測定するベンチマーク）で、GLM-5はオープンソースモデルで#1にランキングしました。Vending Bench 2はモデルに1年間の期間でシミュレーションされた自動販売機ビジネスを運営することを要求し、GLM-5は$4,432の最終残高で完了し、Claude Opus 4.5に接近し、強力な長期計画とリソース管理を実証しています。

GLM-5は**Hugging Face**と**ModelScope**でオープンソース化されており、モデル重みはMITライセンスで公開されています。GLM-5は開発者プラットフォーム**api.z.ai**と**BigModel.cn**でも利用可能で、Claude CodeとOpenClawとの互換性があります。**Z.ai**で無料で試すこともできます。

---

## 🎯 注目ポイント：Use GLM-5 with OpenClaw

### セクション原文

> **Use GLM-5 with OpenClaw**
> Beyond coding agents, GLM-5 also supports *OpenClaw*—a framework that turns GLM-5 into a personal assistant that can *operate across apps and devices*, not just chat.
> OpenClaw is included in GLM Coding Plan. See [guidance](https://docs.z.ai/devpack/tool/openclaw).

### 翻訳

> **GLM-5 with OpenClawの使用**
> コーディングエージェントを超えて、GLM-5は**OpenClaw**もサポートしています。これは、GLM-5を単なるチャットだけでなく、**アプリとデバイス間で動作できるパーソナルアシスタント**に変えるフレームワークです。
> OpenClawはGLM Coding Planに含まれています。[ガイダンス](https://docs.z.ai/devpack/tool/openclaw)を参照してください。

---

## 📋 OpenClawドキュメントまとめ

### 概要

OpenClawは、自分のデバイスで実行し、様々なメッセージングプラットフォームに接続するパーソナルAIアシスタントです。Z.AIのGLMモデルをZ.AI Coding Plan経由で設定して使用できます。

### インストールと設定手順

1. **APIキーの取得** - Z.AIのAPIキーを取得
2. **OpenClawのインストール** - Node.js 22以降が必要
   - macOS/Linux: `curl -fsSL https://openclaw.ai/install.sh | bash`
   - Windows (PowerShell): `iwr -useb https://openclaw.ai/install.ps1 | iex`
3. **OpenClawのセットアップ** - `openclaw onboard --install-daemon`
4. **Z.AIプロバイダーの設定** - APIキーを入力
5. **セットアップの完了** - 残りの設定を続行
6. **ボットとの対話** - Terminal UIでチャット開始
7. **インストール後の検証** - `openclaw doctor`、`openclaw status`、`openclaw dashboard`

### 高度な設定

#### Model Failover（モデルフェイルオーバー）
信頼性を確保するためのモデルフェイルオーバーを設定：

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "zai/glm-4.7",
        "fallbacks": ["zai/glm-4.7-flash"]
      }
    }
  }
}
```

#### ClawHubでスキルを追加
スキルはSKILL.mdファイルを含むフォルダです。新しい機能を追加したい場合、**ClawHub**（https://clawhub.ai/）が最も簡単です。

- インストール: `npm i -g clawhub`
- スキル検索: `clawhub search "postgres backups"`
- スキルダウンロード: `clawhub install my-skill-pack`
- スキル更新: `clawhub update --all`

#### プラグイン
プラグインはOpenClawを追加機能（コマンド、ツール、Gateway RPC）で拡張する小さなコードモジュールです。

- プラグイン一覧: `openclaw plugins list`
- プラグインインストール（例: Voice Call）: `openclaw plugins install @openclaw/voice-call`
- Gateway再起動: `openclaw gateway restart`

### トラブルシューティング

#### 一般的な問題
- **APIキー認証** - キーが正しいか確認
- **モデル利用可能性** - プランでモデルが利用可能か確認
- **接続問題** - ネットワーク設定を確認

### リソース

- **OpenClawドキュメント:** https://docs.openclaw.ai
- **OpenClaw GitHub:** https://github.com/openclaw/openclaw
- **Z.AI Developer Docs:** https://docs.z.ai
- **コミュニティスキル:** https://github.com/awesome-openclaw-skills

---

## 🔍 まとめ

### GLM-5の特徴

1. **巨大なスケールアップ**
   - パラメータ数: 355B（アクティブ32B）→744B（アクティブ40B）
   - 事前学習データ: 23T→28.5Tトークン

2. **強化学習の効率化**
   - 新しい非同期RLインフラ「slime」でトレーニング効率を大幅向上
   - より細かい事後学習の反復を可能に

3. **ベンチマークでの優位性**
   - 推論: Humanity's Last Exam 30.5点
   - コーディング: SWE-bench Verified 77.8点
   - エージェント: Vending Bench 2でオープンソース#1（$4,432残高）

### OpenClawとの統合

| 特徴 | 説明 |
|------|--------|
| **パーソナルアシスタント化** | GLM-5を単なるチャットから、アプリとデバイス間で動作するアシスタントに変換 |
| **GLM Coding Plan対応** - GLM Coding Planに含まれ、設定ガイド提供 |
| **拡張性** | ClawHubでスキル、プラグインで機能追加可能 |
| **マルチチャンネル** | Web UI、Discord、Slackなど複数のチャンネルに対応 |

### 利用方法

1. **GLM Coding Planのサブスクライブが必要** - Maxプランユーザーは即時利用可能、他プランは順次展開
2. **APIキーの設定** - Z.AIからAPIキーを取得してOpenClawに設定
3. **スキル/プラグインの追加** - ClawHubから必要な機能を追加
4. **対話開始** - Terminal UIや各種チャンネルからGLM-5を活用

---

## 📎 関連リンク

- [GLM-5 Blog](https://z.ai/blog/glm-5)
- [OpenClaw Documentation](https://docs.openclaw.ai)
- [OpenClaw on Z.AI](https://docs.z.ai/devpack/tool/openclaw)
- [ClawHub](https://clawhub.ai)
- [GitHub: zai-org/GLM-5](https://github.com/zai-org/GLM-5)
- [HuggingFace: GLM-5](https://huggingface.co/zai-org/GLM-5)
