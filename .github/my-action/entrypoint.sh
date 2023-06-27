#!/bin/sh -l

set -e

if [ -z "$ACCESS_TOKEN" ]
then
  echo "You must provide the action with a GitHub Personal Access Token secret in order to deploy."
  exit 1
fi

if [ -z "$BRANCH" ]
then
  echo "You must provide the action with a branch name it should deploy to, for example gh-pages or docs."
  exit 1
fi

if [ -z "$FOLDER" ]
then
  echo "You must provide the action with the folder name in the repository where your compiled page lives."
  exit 1
fi

case "$FOLDER" in /*|./*)
  echo "The deployment folder cannot be prefixed with '/' or './'. Instead reference the folder name directly."
  exit 1
esac


# 进入工作目录
cd $GITHUB_WORKSPACE && \

# 配置 Git.
git config --global user.email 771565119@qq.com && \
git config --global user.name Hans && \

## Initializes the repository path using the access token.
REPOSITORY_PATH="https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \

# Checks to see if the remote exists prior to deploying.
# If the branch doesn't exist it gets created here as an orphan.
# 统计输出行数 wc -l
# -eq 对比相等的意思
if [ "$(git ls-remote --heads "$REPOSITORY_PATH" "$BRANCH" | wc -l)" -eq 0 ];
then
  echo "Creating remote branch ${BRANCH} as it doesn't exist..."
  git checkout "${BASE_BRANCH:-master}" && \
  git checkout --orphan $BRANCH && \
  git rm -rf . && \
  touch README.md && \
  git add README.md && \
  git commit -m "Initial ${BRANCH} commit" && \
  git push $REPOSITORY_PATH $BRANCH
  # 上一条命令的执行失败则退出
  if [ $? -ne 0 ];
  then
    echo "create remote branch failed..."
    exit 1
  fi
fi

# 切换到主分支
git checkout $BASE_BRANCH && \

# Builds the project if a build script is provided.
echo "执行脚本 $BUILD_SCRIPT" && \
eval "$BUILD_SCRIPT" && \

# git 提交
echo "提交git" && \
git add -f $FOLDER && \
git commit -m "Deploying to ${BRANCH} from $BASE_BRANCH ${GITHUB_SHA}" --quiet && \

# 获取docs文件夹的hash值，只提交docs文件夹到branch分支
git push $REPOSITORY_PATH `git subtree split --prefix $FOLDER $BASE_BRANCH`:$BRANCH --force && \
echo "发布成功"