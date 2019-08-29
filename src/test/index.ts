(() => {
  let proxyConfig = {
    '/proxy': 'http://127.0.0.1:7777',
    '/py': 'http://127.0.0.1:8888'
  }
  let ee = Object.entries(proxyConfig)
  if(!ee.length) return
  let a =ee.find(v => {
    return v[0] === '/proxy'
  })
  if(!a) return
  
  console.log(a[1])
  debugger
})()
