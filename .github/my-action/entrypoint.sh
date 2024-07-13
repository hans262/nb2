#!/bin/sh -l

set -e

if [ -z "$ACCESS_TOKEN" ]
then
  echo "缺少ACCESS_TOKEN，请到github配置"
  exit 1
fi

if [ -z "$BRANCH" ]
then
  echo "缺少分支变量"
  exit 1
fi

if [ -z "$FOLDER" ]
then
  echo "缺少文件夹变量"
  exit 1
fi

case "$FOLDER" in /*|./*)
  echo "文件夹名，不能以/或者./开头"
  exit 1
esac

echo "\e[1;32mnode version: $(node -v)\e[0m" && \
echo "git version: $(git --version)" && \
echo "npm version: $(npm -v)" && \
echo "pnpm version: $(pnpm -v)" && \

echo "安装pnpm" && \
npm install pnpm -g && \
echo "pnpm version: $(pnpm -v)" && \

# git 权限操作问题
git config --global --add safe.directory $GITHUB_WORKSPACE
# 初始化git仓库地址
REPOSITORY_PATH="https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \

echo "进入workspace" && \
cd $GITHUB_WORKSPACE && \

echo "配置git" && \
git config --global user.email 771565119@qq.com && \
git config --global user.name Hans && \

echo "检查发布分支是否存在" && \
if [ $(git ls-remote --heads $REPOSITORY_PATH $BRANCH | wc -l) -eq 0 ];
then
  echo "创建发布分支${BRANCH}"
  git checkout $BASE_BRANCH && \
  git checkout --orphan $BRANCH && \
  git rm -rf . && \
  touch README.md && \
  git add README.md && \
  git commit -m "初始化提交" && \
  git push $REPOSITORY_PATH $BRANCH
  # 上一条命令的执行失败则退出
  if [ $? -ne 0 ];
  then
    echo "创建分支失败"
    exit 1
  fi
fi

echo "切换到主分支" && \
git checkout $BASE_BRANCH && \

echo "安装依赖" && \
npm install && \

echo "生成文档" && \
npm run doc && \

echo "生成网站图标"
npm run doc-icon && \

echo "提交代码" && \
git add -f $FOLDER && \
git commit -m "发布 ${BRANCH} 来自 $BASE_BRANCH 的修改 ${GITHUB_SHA}" --quiet && \

# 获取docs文件夹的hash值
DIR_PRIFIX=$(git subtree split --prefix $FOLDER $BASE_BRANCH) && \

echo "推到分支$BRANCH" && \
git push $REPOSITORY_PATH $DIR_PRIFIX:$BRANCH --force && \

echo "发布成功！"