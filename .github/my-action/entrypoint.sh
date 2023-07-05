#!/bin/sh -l

set -e

if [ -z "$ACCESS_TOKEN" ]
then
  echo "缺少环境变量ACCESS_TOKEN， 请到github仓库设置"
  exit 1
fi

if [ -z "$BRANCH" ]
then
  echo "缺少发布分支环境变量"
  exit 1
fi

if [ -z "$FOLDER" ]
then
  echo "缺少发布文件夹环境变量"
  exit 1
fi

case "$FOLDER" in /*|./*)
  echo "文件夹名，不能以/或者./开头"
  exit 1
esac

echo $(node -v) && \

echo "进入工作目录" && \
cd $GITHUB_WORKSPACE && \

echo "配置git" && \
git config --global user.email 771565119@qq.com && \
git config --global user.name Hans && \

# 初始化git仓库地址
REPOSITORY_PATH="https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \

# 检查发布分支是否存在
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

echo "切换到分支主分支" && \
git checkout $BASE_BRANCH && \

echo "安装依赖项" && \
npm install && \

echo "生成文档" && \
npm run doc && \

echo "制作网站图标"
npm run doc-icon && \

echo "提交git" && \
git add -f $FOLDER && \
git commit -m "发布 ${BRANCH} 来自 $BASE_BRANCH 的修改 ${GITHUB_SHA}" --quiet && \

# 获取docs文件夹的hash值
DIR_PRIFIX=$(git subtree split --prefix $FOLDER $BASE_BRANCH) && \

echo "推送到分支$BRANCH" && \
git push $REPOSITORY_PATH $DIR_PRIFIX:$BRANCH --force && \

echo "发布成功！"