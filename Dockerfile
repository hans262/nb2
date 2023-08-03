FROM node:lts

# 拷贝所有内容到/app
COPY . /app

# 进入到工作目录/app
WORKDIR /app

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org

# 暴露端口
EXPOSE 5000

# 容器运行后的执行程序，只能有一个
CMD npm run dev