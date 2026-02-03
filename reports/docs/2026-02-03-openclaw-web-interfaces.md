---
layout: default
title: "OpenClaw Web & Interfaces ドキュメント翻訳"
parent: ドキュメント・翻訳
date: 2026-02-03
---

# OpenClaw Web & Interfaces ドキュメント翻訳

**作成日:** 2026-02-03
**タイプ:** ドキュメント翻訳
**元ソース:** [Web - OpenClaw](https://docs.openclaw.ai/web)

---

## 📝 概要

OpenClawのWebインターフェースとバインドモード、セキュリティ設定に関するドキュメントを日本語に翻訳。

---

## 📄 内容

## Web (Gateway)

Gatewayは、Gateway WebSocketと同じポートから小さなブラウザControl UI（Vite + Lit）を提供します：

- **デフォルト:** `http://<host>:18789/`
- **オプションのプレフィックス:** `gateway.controlUi.basePath` を設定（例: `/openclaw`）

機能は[Control UI](/web/control-ui)にあります。
このページでは、バインドモード、セキュリティ、およびWeb公開のサーフェスに焦点を当てます。

## Webhooks

`hooks.enabled=true` の場合、Gatewayは同じHTTPサーバー上で小さなWebhookエンドポイントも公開します。
認証とペイロードについては、[Gateway configuration](/gateway/configuration) → hooks を参照してください。

## Config（デフォルトで有効）

アセット（`dist/control-ui`）が存在する場合、Control UIはデフォルトで有効になります。
設定で制御できます：

```json
{
  gateway: {
    controlUi: { enabled: true, basePath: "/openclaw" }, // basePathはオプション
  },
}
```

## Tailscale access

### Integrated Serve（推奨）

Gatewayをループバックに保持し、Tailscale Serveにプロキシさせます：

```json
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

次にGatewayを起動します：

```bash
openclaw gateway
```

開く：

- `https://<tailscale-node-name>/`（または設定した `gateway.controlUi.basePath`）

### Tailnet bind + token

```json
{
  gateway: {
    bind: "tailnet",
    controlUi: { enabled: true },
    auth: { mode: "token", token: "your-token" },
  },
}
```

次にGatewayを起動します（ループバック以外のバインドにはトークンが必要）：

```bash
openclaw gateway
```

開く：

- `http://<tailnet-host>:18789/`（または設定した `gateway.controlUi.basePath`）

### Public internet（Funnel）

```json
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "funnel" },
    auth: { mode: "password" }, // または OPENCLAW_GATEWAY_PASSWORD
  },
}
```

## Security notes（セキュリティノート）

- Gatewayの認証はデフォルトで必須です（トークン/パスワードまたはTailscale IDヘッダー）。
- ループバック以外のバインドには、引き続き共有トークン/パスワードが必要です（`gateway.auth` または環境変数）。
- ウィザードはデフォルトでGatewayトークンを生成します（ループバックでも）。
- UIは `connect.params.auth.token` または `connect.params.auth.password` を送信します。
- Serveを使用すると、`gateway.auth.allowTailscale` が `true` の場合、Tailscale IDヘッダーが認証を満たすことができます（トークン/パスワードは不要）。明示的な認証情報を要求するには `gateway.auth.allowTailscale: false` を設定します。[Tailscale](/gateway/tailscale)および[Security](/gateway/security)を参照してください。
- `gateway.tailscale.mode: "funnel"` には `gateway.auth.mode: "password"`（共有パスワード）が必要です。

## Building the UI（UIのビルド）

Gatewayは `dist/control-ui` から静的ファイルを提供します。
次のコマンドでビルドします：

```bash
pnpm ui:build  # 初回実行時にUIの依存関係を自動インストール
```

---

## 📎 参考リンク

- [元ドキュメント](https://docs.openclaw.ai/web)
- [Control UI](https://docs.openclaw.ai/web/control-ui)
- [Gateway Configuration](https://docs.openclaw.ai/gateway/configuration)
- [Tailscale](https://docs.openclaw.ai/gateway/tailscale)
- [Security](https://docs.openclaw.ai/gateway/security)
