import { exec, ExecException, execSync } from 'child_process'
/**
 * 运行shell
 */

//异步
exec('node -v', (err: ExecException, stdout: string, stderr: string) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(stdout)
  console.log(stderr)
})
//同步
const stdout: Buffer = execSync('node -v')
console.log(stdout.toString())