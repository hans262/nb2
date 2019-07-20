import { it } from "./modules/request";

; (async () => {
  try {
    const ret = await it({
      hostname: '127.0.0.1',
      port: 5000,
      path: '/api/post',
      method: 'POST',
      body: 'hello world'
    })
    console.log(ret)
    const { response } = ret
    console.log(response.toString())
  } catch (err) {
    console.log(err)
  }
})()