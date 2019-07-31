import { exec, ExecException, execSync } from 'child_process'
/**
 * shell
 */
export function runShell() {
  //异步
  exec('node -v', (err: ExecException | null, stdout: string, stderr: string) => {
    if (err) return console.log(err)
    console.log(stdout)
    console.log(stderr)
  })
  //同步
  const stdout: Buffer = execSync('node -v')
  console.log(stdout.toString())
}