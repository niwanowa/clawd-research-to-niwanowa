# niwanowa.tips

このサイトは以下でホスティングしています。

<https://hugo.niwanowa.tips/>

## コマンドメモ

### アップデート

#### Windows

```bash
CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
```

#### macOS

```bash
brew upgrade hugo
```

### ローカルサーバー起動

```bash
cd niwanowa.tips/
hugo server -D
```

## 参考資料

[Hugo を使った CloudFront + S3 のブログサイトを構築してみた 〜 GitHub Actions で CI/CD 付き | DevelopersIO](https://dev.classmethod.jp/articles/cloudfront-and-s3-using-hugo-with-github-actions/)
