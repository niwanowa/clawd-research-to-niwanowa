---
title: "Pythonのパッケージ管理ツールPoetryを導入してみた"
date: 2023-10-23T04:08:16Z
draft: false
---

pythonのパッケージ管理ツールといえばpipが有名ですが、  
複数プロジェクトにまたがった依存関係を解決しようとすると辛い気持ちになりがちです。  
pyenv-virtualenvで仮想環境を作っても、仮想環境の構成を各環境で行わないといけなかったり、  
モジュールを追加する度にpip freezeをしないといけないのが辛いポイントでした。

```shell
pip freeze -l > requirements.txt
```

そんな中、Poetryというツールを見つけました。
これはnpm感覚で、モジュールを追加してくれたり、1コマンドで仮想環境のセットアップを終えてくれたりします。

<https://python-poetry.org/>

## インストール

[公式ドキュメント](https://python-poetry.org/docs/)を参考に以下でできます。

```shell
curl -sSL https://install.python-poetry.org | python3 -
```

## 使い方

### プロジェクトの初期化

```shell
poetry init -n
```

### パッケージの追加

```shell
poetry add [パッケージ名]
```

### 実行

```shell
poetry run python [ファイル名]
```

## まとめ

自分の備忘録もかねてPoetryについて記事に書き起こしてみました。
実行だけはpyenv-virtualenvよりも冗長になってしまいますが、  
まぁ実行コマンドを手打ちする機会はほぼないので良いかなって感じです。

ちなみにpoetryは詩って意味だそう。

## 参考

・<https://qiita.com/ksato9700/items/b893cf1db83605898d8a>
