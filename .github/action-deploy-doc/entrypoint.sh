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

# Installs Git and jq.
apt-get update && \
apt-get install -y git && \

# Directs the action to the the Github workspace.
cd $GITHUB_WORKSPACE && \

# Configures Git.
git init && \
git config --global user.email 771565119@qq.com && \
git config --global user.name ounana && \

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

# Checks out the base branch to begin the deploy process.
git checkout "${BASE_BRANCH:-master}" && \

# Builds the project if a build script is provided.
echo "Running build scripts... $BUILD_SCRIPT" && \
eval "$BUILD_SCRIPT" && \

# Commits the data to Github.
echo "Deploying to GitHub..." && \
git add -f $FOLDER && \

git commit -m "Deploying to ${BRANCH} from ${BASE_BRANCH:-master} ${GITHUB_SHA}" --quiet && \
# 获取docs文件夹的hash值，只提交docs文件夹到branch分支
git push $REPOSITORY_PATH `git subtree split --prefix $FOLDER ${BASE_BRANCH:-master}`:$BRANCH --force && \
echo "Deployment succesful!"