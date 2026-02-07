---
title: 「ゼロからのOS自作入門」開発環境構築メモ
author: niwa
date: 2023-04-28T15:10:19+09:00
draft: true
categories:
  - にわのわ.log

---
ゼロからのOS自作入門という本を読んでいる。

http://zero.osdev.jp/

本で書かれている動作環境がUbuntu Desktopでつらめなので  
実際に1章のハローワールドが表示されるまでのコマンドログだったりメモを残す  
書いていることは以下の2記事の焼き直しなのでこちらを読むことを推奨します。  
このページは

https://zenn.dev/sarisia/articles/6b57ea835344b6

<https://zenn.dev/karaage0703/articles/1bdb8930182c6c>

## 前準備 

dockerをインストール

<pre class="wp-block-code"><code>brew install --cask docker</code></pre>

Launchpad(じゃなくてもいいけど)からDocker GUIを開いてログイン(登録)してやらないとdockerコマンドが有効化されなかったので注意

vscodeをインストール

<pre class="wp-block-code"><code>brew reinstall --cask visual-studio-code</code></pre>

vscode拡張機能のDev Containersをインストール

<pre class="wp-block-code"><code>code --install-extension ms-vscode-remote.remote-containers</code></pre>

前準備終わり

## 記事を読みながら 

以下のページの使い方を読みながら作業する

<https://github.com/sarisia/mikanos-devcontainer>

<blockquote class="wp-block-quote">
  <p>
    1.当リポジトリページの右上 &#8220;Use this template&#8221; からリポジトリを作成 (GitHub Docs)
  
</blockquote>

文面の通り  
2022/04/21時点ではここ<figure class="wp-block-image size-large">

<img decoding="async" loading="lazy" width="1024" height="321" src="https://blog.niwanowa.tips/wp-content/uploads/2023/04/名称未設定-1-1024x321.png" alt="" class="wp-image-100" srcset="https://blog.niwanowa.tips/wp-content/uploads/2023/04/名称未設定-1-1024x321.png 1024w, https://blog.niwanowa.tips/wp-content/uploads/2023/04/名称未設定-1-300x94.png 300w, https://blog.niwanowa.tips/wp-content/uploads/2023/04/名称未設定-1-768x241.png 768w, https://blog.niwanowa.tips/wp-content/uploads/2023/04/名称未設定-1-1536x482.png 1536w, https://blog.niwanowa.tips/wp-content/uploads/2023/04/名称未設定-1-2048x643.png 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /> </figure> 

<blockquote class="wp-block-quote">
  <p>
    2.ローカルにチェックアウト
  
</blockquote>

<pre class="wp-block-code"><code>git clone {作成されたリポジトリのURL}</code></pre>

<blockquote class="wp-block-quote">
  <p>
    3.VSCode で devcontainer を開く (VSCode Docs)
  
</blockquote>

<pre class="wp-block-code"><code>cd mikanos-devcontainer
code ./
</code></pre>

Dev Containersのタブで「Open Folder In Container」が表示されない場合Docker GUIを開いてログインしてみる(1敗)

<blockquote class="wp-block-quote">
  <p>
    4.本の手順に従い VcXsrv を導入, 起動することで, QEMU での動作確認ができます
  
</blockquote>

やりたいことはxサーバを建てること。んでmacだとxquartzを使うとできるらしい

<pre class="wp-block-code"><code>brew install --cask xquartz</code></pre>

XQuartzを起動するとxtermが開くのでそこに以下を入力

<pre class="wp-block-code"><code>xhost + 127.0.0.1</code></pre>