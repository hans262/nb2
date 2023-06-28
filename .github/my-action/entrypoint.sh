#!/bin/sh -l

set -e

if [ -z "$ACCESS_TOKEN" ]
then
  echo "请设置仓库的TOKEN环境变量"
  exit 1
fi

if [ -z "$BRANCH" ]
then
  echo "请设置发布分支"
  exit 1
fi

if [ -z "$FOLDER" ]
then
  echo "请设置资源文件夹"
  exit 1
fi

case "$FOLDER" in /*|./*)
  echo "文件夹名，不能以/或者./开头"
  exit 1
esac


echo "进入工作目录" && \
cd $GITHUB_WORKSPACE && \

echo "配置git" && \
git config --global user.email 771565119@qq.com && \
git config --global user.name Hans && \

## 初始化git仓库地址
REPOSITORY_PATH="https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \

# 检查发布分支是否存在，不存在则创建
# wc -l统计输出行数，-eq对比相等
if [ "$(git ls-remote --heads $REPOSITORY_PATH $BRANCH | wc -l)" -eq 0 ];
then
  echo "创建分支${BRANCH}，如果他不存在"
  git checkout $BASE_BRANCH && \
  git checkout --orphan $BRANCH && \
  git rm -rf . && \
  touch README.md && \
  git add README.md && \
  git commit -m "Initial ${BRANCH} commit" && \
  git push $REPOSITORY_PATH $BRANCH
  # 上一条命令的执行失败则退出
  if [ $? -ne 0 ];
  then
    echo "创建发布分支失败"
    exit 1
  fi
fi

echo "切换到分支 $BUILD_SCRIPT" && \
git checkout $BASE_BRANCH && \

echo "执行脚本 $BUILD_SCRIPT" && \
eval "$BUILD_SCRIPT" && \

echo "提交git" && \
git add -f $FOLDER && \
git commit -m "Deploying to ${BRANCH} from $BASE_BRANCH ${GITHUB_SHA}" --quiet && \

echo "发布到分支"
# 获取docs文件夹的hash值，只提交docs文件夹到branch分支
git push $REPOSITORY_PATH `git subtree split --prefix $FOLDER $BASE_BRANCH`:$BRANCH --force && \
echo "发布成功"