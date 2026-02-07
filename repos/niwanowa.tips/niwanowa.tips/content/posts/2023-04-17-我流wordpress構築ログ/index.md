---
title: 我流wordpress構築ログ
author: niwa
date: 2023-04-17T07:53:46+00:00
categories:
  - にわのわ.log

---
 

簡単にこのブログの構築ログを残す。  
howというよりwhyについて書くように意識したつもり。

## 材料 

  * Amazon Lightsail(WordPress)
  * ROUTE 53

なんとなく、はてなやzennではなく自分で構築してみたかったのでwordpressを選択。  
色々なホスティングサービスを検討した結果1ヶ月3.5💲のlightsailに決定。  
lightsailだとボタンぽちぽちでとりあえずwordpressが建つため構築の手間いらず。  
同じAWSだからって理由でROUTE 53 でドメイン取得。  
(これまたLightsailの中でボタンぽちぽちしてドメイン紐づけられるので楽だった)

## 導入したプラグイン 

  * Pz-LinkCard  
    リンクをいい感じにしたくて
  * WPS Hide Login  
    /wp-adminで管理画面を見られるのがなんか嫌だったので

## 使っているテーマ 

Blogus

カスタムCSS

<pre class="wp-block-code"><code>//ウィジットの検索メニューがとっても大きかったので少し小さく
.wp-block-search__inside-wrapper {
	   width: 666px;
    height: 50px;
}

//本文が灰色で見づらかったので取り合えず黒色に
:root {
	--text-color: #000;
}</code></pre>

## SSL/TLS有効化 

以下の記事の通りに実行

https://lightsail.aws.amazon.com/ls/docs/ja_jp/articles/amazon-lightsail-enabling-https-on-wordpress

その後、管理画面にログインできなくなったので  
wordpressのサーバにsshでログイン、

~/stack/wordpress/wp-config.phpを以下のように変更

変更前

<pre class="wp-block-code"><code>define( 'WP_HOME', 'http://' . $_SERVER&#91;'HTTP_HOST'] . '/' );
define( 'WP_SITEURL', 'http://' . $_SERVER&#91;'HTTP_HOST'] . '/' );</code></pre>

変更後

<pre class="wp-block-code"><code>define( 'WP_HOME', 'http&lt;strong>&lt;mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">s&lt;/mark>&lt;/strong>://' . $_SERVER&#91;'HTTP_HOST'] . '/' );
define( 'WP_SITEURL', 'http&lt;strong>&lt;mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-vivid-red-color">s&lt;/mark>&lt;/strong>://' . $_SERVER&#91;'HTTP_HOST'] . '/' );</code></pre>