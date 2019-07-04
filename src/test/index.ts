import { lookup, getServers } from 'dns'
lookup('www.baidu.com', (
  err: NodeJS.ErrnoException | null,
  address: string, family: number
) => {
  console.log(err)
  console.log(address)
  console.log(family)
})

console.log(getServers())
debugger