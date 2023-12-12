# nodejs
一些用法记录。

```ts
  // 获取脚本执行结果
  import child_process from 'node:child_process'
  const ret = child_process.execSync('git --version')
  console.log(ret)

  // 逐行读取文件
  import { createInterface } from 'node:readline'
  import { createReadStream } from 'node:fs';
  const rl = createInterface({
    input: createReadStream('root/index.html'), crlfDelay: Infinity
  })
  rl.on('line', line => {
    console.log(line)
  })
```
