# 配置

## Server Options

应用服务器的相关配置

- **port** (可选)

  - **描述**: 应用程序监听的端口。
  - **默认值**: 8080
  - **类型**: number

- **hostname** (可选)

  - **描述**: 服务器主机名。
  - **默认值**: "127.0.0.1"
  - **类型**: string

- **https** (可选)

  - **描述**: 启用 HTTPS 的设置。
  - **默认值**: false
  - **类型**: { key: Buffer; cert: Buffer } | false
    - **key**: 用于加密的密钥（Buffer 类型）
    - **cert**: 用于验证的证书（Buffer 类型）

- **cors** (可选)

  - **描述**: 跨域资源共享配置。
  - **默认值**:
    - origin: "\*"
    - credentials: false
    - maxAge: 60
  - **类型**: object | boolean
    - **origin**: 允许访问的域名。
    - **credentials** (可选): 是否允许发送 cookies 和 HTTP 认证信息。如果设置为 `true`，则 `origin` 不能为 `*`。
    - **maxAge** (可选): 预检请求的缓存时间（单位：秒）。

- **static** (可选)
  - **描述**: 静态文件服务的相关配置。
  - **默认值**:
    - root: "/"
    - canZipFile: ["css", "html", "js", "woff"]
    - cacheMaxAge: 86400 (一天)
    - index: true
    - spa: false
  - **类型**: object
    - **root**: 静态资源本地根路径。
    - **canZipFile** (可选): 默认允许压缩的文件列表。
    - **cacheMaxAge** (可选): 资源缓存时间，单位：秒。
    - **index** (可选): 是否在请求目录时默认响应 `index.html` 文件。
    - **spa** (可选): 单页 SPA 应用模式下，是否将全局的 404 错误重定向到 `index.html`。
