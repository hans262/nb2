#!/bin/sh -l
set -e

echo "清理lib目录"
[ -d "lib" ] && rm -rf lib || true

echo "启动构建"
npm run build || { echo "构建失败"; exit 1; }

npm config set registry https://registry.npmjs.org

echo "开始发布"
npm publish --access=public || { echo "发布失败"; exit 1; }

npm config set registry http://registry.npm.taobao.org