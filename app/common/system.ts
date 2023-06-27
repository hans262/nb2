import { exec, ExecException } from 'node:child_process'

/**
 * @version 2019-10-15
 * @param cmd 
 */
export function system(cmd: string) {
  exec(cmd, (err: ExecException | null, stdout: string, stderr: string) => {
    if (err) return console.log(err)
    console.log(stderr)
    console.log(stdout)
  })
}