# GitHub Pages デプロイ手順

このプロジェクトはGitHub Pagesで公開できるように設定されています。

## セットアップ手順

### 1. GitHub Pages設定を有効化

1. GitHubリポジトリにアクセス：https://github.com/niwanowa/suwa-shrine-gourmet-guide
2. **Settings** タブをクリック
3. 左側メニューから **Pages** をクリック
4. **Build and deployment** セクションで以下を設定：
   - **Source**: 「Deploy from a branch」を選択
   - **Branch**: 「main」を選択
   - **Folder**: 「/ (root)」を選択
5. **Save** をクリック

### 2. デプロイ確認

- デプロイが開始されます（1～2分待機）
- 完了後、以下のURLでサイトが公開されます：
  ```
  https://niwanowa.github.io/suwa-shrine-gourmet-guide/
  ```

## ローカルでのビルド

GitHub Pagesでの公開用にビルドする場合：

```bash
GITHUB_PAGES=true npm run build
```

このコマンドで `dist/` フォルダにビルド済みファイルが生成されます。

## 更新方法

コードを更新してGitHubにプッシュすると、自動的にGitHub Pagesが更新されます。

```bash
git add .
git commit -m "Update content"
git push origin main
```

## トラブルシューティング

### サイトが表示されない場合
- GitHub Pages設定で「Deploy from a branch」が選択されているか確認
- ブランチが「main」に設定されているか確認
- リポジトリが公開設定になっているか確認

### スタイルが反映されない場合
- ブラウザキャッシュをクリアしてリロード（Ctrl+Shift+R）
- デプロイが完全に完了するまで数分待機

## 参考リンク

- [GitHub Pages公式ドキュメント](https://docs.github.com/ja/pages)
- [Vite - GitHub Pages デプロイガイド](https://vitejs.dev/guide/static-deploy.html#github-pages)
