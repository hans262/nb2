# npm

* 查看全局包
npm ls -g --depth 0

* 加入到生产阶段依赖
npm install react -S

* 加入到开发阶段依赖
npm install react -D

* 安装指定版本
npm install react@16.8.2

* 初始化项目
npm init my-app

* 卸载包
npm uninstall react -S|-D

* 修复包
npm audit fix

* 得到检查报告
npm audit --json

* 更新包
npm update
npm update -g

## 全局
* 包位置修改
npm config set prefix  "D:\nodejs\node_global"
* 缓存目录修改
npm config set cache "D:\nodejs\node_cache"
* 全款包安装路径
npm root -g
* 镜像地址查看
npm get registry
* 官网地址
https://registry.npmjs.org/
* 淘宝
npm config set registry http://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist/

* yarn地址修改
yarn config set registry https://registry.npm.taobao.org
yarn config set disturl https://npm.taobao.org/dist/