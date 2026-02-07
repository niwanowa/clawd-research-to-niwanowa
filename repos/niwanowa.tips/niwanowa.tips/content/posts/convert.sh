#!/bin/bash

# 現在のディレクトリ内の.mdファイルを取得
for file in *.md; do
    # ファイル名を取得
    filename=$(basename "$file" .md)
    # ディレクトリを作成し、index.mdにリネーム
    mkdir -p "$filename"
    mv "$file" "$filename/index.md"
done