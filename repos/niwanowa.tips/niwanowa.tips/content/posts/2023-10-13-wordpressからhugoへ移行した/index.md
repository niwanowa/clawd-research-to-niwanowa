---
title: "Wordpressからhugoへ移行した"
date: 2023-10-13T05:21:50Z
draft: false
categories:
  - にわのわ.log
---
~~富豪になりたいからhugo使ってみようかななんつって~~

最近、Git Hubのcontributionsを埋めることを日課にしており、  
wordpressにあるブログの記事をgit管理することで  
contributionに含めてズルできないかなって考えていたらhugoに出会った。

hugoは静的サイトジェネレーターなのでgit管理できるし、  
S3上に乗っけるだけなのでlightsailで動かしてるwordpressよりも安くなるし、  
元々wpをごりごり活用できてたわけではないので試しに乗り換えてみようと思った。


## hugoの構築する
hugoの構築は[この記事](https://dev.classmethod.jp/articles/cloudfront-and-s3-using-hugo-with-github-actions/)を参考に構築した。
唯一、記事を削除した時にこけてたのでiam-role.yamlだけ48行目付近を以下のように変更している。
``` yaml
  S3AccessPolicy:
    Type: "AWS::IAM::ManagedPolicy"
    Properties:
      ManagedPolicyName: !Sub ${ProjectName}-${Environment}-S3AccessPolicy
      Path: "/"
      PolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: "Allow"
            Action:
              - "s3:ListBucket"
              - "s3:PutObject"
              - "s3:DeleteObject"
            Resource:
              - !Sub arn:aws:s3:::${DeployTargetS3BucketName}
              - !Sub arn:aws:s3:::${DeployTargetS3BucketName}/*
```
## wordpressからhugoへ記事を移行する
[公式](https://gohugo.io/tools/migrations/#wordpress)で推奨されているwordpress-to-hugo-exporterを使用した。
{{< blog-card "https://github.com/SchumacherFM/wordpress-to-hugo-exporter" >}}

出力されたものは一応そのまま読み込めるけど画像とかリンクとか記事全体がpタグつけられてたりでアドリブを効かせた修正が必要...

## hugoのカスタマイズ
- 使用したテーマ
{{< blog-card "https://github.com/adityatelange/hugo-PaperMod" >}}
- 追加したショートコード
{{< blog-card "https://www.meganii.com/blog/2022/08/29/how-to-create-blogcard-with-resources-getremote-in-hugo/" >}}