---
title: "WSLにgoとhugoをインストールする"
date: 2024-09-06T17:42:36+09:00
draft: false
---

## はじめに

気が付いたらhugoの公式ページからdockerでのインストール手順が消えていたので
WSL環境をdockerからgo + hugoの形に変更した。
その作業メモ。

## goのインストール

ubuntuのapt installだと最新のgoが入らなかったのでPPAを追加してインストールする必要がある
参考 : [Go Wiki: Ubuntu](https://go.dev/wiki/Ubuntu)

```bash
sudo add-apt-repository ppa:longsleep/golang-backports
```

```bash
sudo apt install golang-go
```

ヨシ

```bash
go version
go version go1.22.6 linux/amd64
```

## hugoのインストール

今回はBuild from sourceの手順でインストールした
~WSLのubuntuにはsnapが入ってるのでこっちのほうが楽かもしれない~
参考: [Linux | Hugo](https://gohugo.io/installation/linux/#build-from-source)
アップデート時も同様のコマンドで行う

```bash
CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
```

go/bin配下にpathを通す
~/.bashrcに以下を追記

```bash
    export PATH=$HOME/go/bin:$PATH
```

## その他設定

弊ブログではstackテーマを使っており、git submodulesで定義しているのでインポートする必要がある。

```bash
git submodule init
```

```bash
git submodule update
```

## おわりに

これでwindows環境でもブログが書けるようになったので幸せ係数が上がる気がする。
tasks.jsonあたりで自動アップデートできるようにしたいなぁ、など
