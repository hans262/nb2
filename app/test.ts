import { fetchOn } from "../src/index.js"

fetchOn('https://127.0.0.1:5000/api/get?aw=dwq&dd=s').then(res => {
  console.log(res.data.toString())
})