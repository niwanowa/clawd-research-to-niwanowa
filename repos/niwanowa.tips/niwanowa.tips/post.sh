#!/bin/bash
if [ $# -ne 1 ]; then
  echo "to run \"./post.sh [記事名]\"" 1>&2
  exit 1
fi

today=`date "+%F"`

hugo new posts/$today-$1/index.md
