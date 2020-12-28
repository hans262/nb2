# git

## 基础配置

### 查看

  + git config user.name  
  + git config user.email

### 设置

  + git config --global user.name "ounana"  
  + git config --global user.email "771565119@qq.com"

## 创建仓库

### 初始化

  + git init
  + git init [文件夹名] //自动创建文件夹

### 克隆

  + git clone [远程库地址]

## 本地提交

### 添加到暂存区

  + git add .

### 提交

  + git commit -m "注释"

### 放弃修改

  + git checkout [文件名]

### 文件状态

  + git status

## 日志

  + git log
  + --oneline 一行显示
  + --all 所有日志
  + --graph 图形化
  + HEAD 当前指针位置，版本位置
  + master 主分支

## 分支操作

### 查看

  + git branch //本地分支
  + git branch -a //本地分支+远程分支

### 创建

  + git branch [分支名]
  + git checkout -b [分支名] //创建并切换
  + git checkout --orphan [分支名] //创建孤立分支，没有任何提交

### 切换

  + git checkout [分支名]
  + git checkout master //回到主分支

### 定位、回滚 HEAD

  + git checkout [身份信息]

### 合并 把谁的分支合并到当前自己的分支，将分支与当前分支合并

  + git merge [分支名]

### 删除

  + git push origin --delete [分支名] //删除远程分支
  + git branch -d [分支名] //删除本地分支

### 多人开发模式：

  + 从主分支创建自己的分支，然后修改自己的分支，最后合并到主分支

### 更新远程分支列表

  + git remote update origin -p

  

## 远程仓库

### 查看
  git remote 
  git remote -v //显示详细信息

### 添加

  git remote add [远程库名] [远程库地址]

### 修改

  git remote set-url [远程库名] [远程库地址]

### 推

  git push -u [远程库名] [分支名]
  git push

### 拉

  git pull

### 克隆

  git clone [远程库地址]
  git clone [远程库地址] [自定义文件夹]

* origin 默认的远程库名

## 配置ssh公钥

### 检查是否存在
  鼠标右键打开 Git Bash Here 窗口
  cd ~/.ssh 进入ssh文件夹
  ls 查看子文件
  id_rsa  id_rsa.pub  known_hosts  .pub就是公钥文件

### 生成

  ssh-keygen -t rsa -C "你的邮箱"

## github多人开发

  + organization 组织
  + team 团队
  + repository 仓库

### 操作流程

  创建组织
  组织创建仓库，团队
  向团队添加成员
  组织仓库添加一个团队，并为团队设置权限

## github

  + stars:>1 搜索最多starts
