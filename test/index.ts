import { Configuration, OpenAIApi } from 'openai'
import { createReadStream, writeFileSync } from 'node:fs'
import { PUBLIC_PATH } from '../src/index.js';
import { join } from 'node:path'
import { createInterface } from 'node:readline';

const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Q: 眼袋要怎么去除 \nA: ",
//   max_tokens: 1000,
//   frequency_penalty: 0.0,
//   presence_penalty: 0.0,
//   top_p: 0.5, //概率质量
// })
// console.log(response.data.choices[0].text)

let words: { id: number, Q: string, A: string }[] = []

const rl = createInterface({
  input: process.stdin,
  crlfDelay: Infinity
})
rl.on('line', async (line: string) => {
  // console.log(line)

  const id = Date.now() + Math.random()

  words.push({ id, Q: line, A: '' })
  let prompt = words.map(v => 'Q: ' + v.Q + '\nA: ' + v.A).join('\n')
  // console.log(prompt)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1000,
    frequency_penalty: 1.0, // 降低重复同一行的可能性
    presence_penalty: 1.0, //-2.0 - 2.0 谈论新主题的可能性
    top_p: 0.5, //概率质量 0 - 1
  })
  // console.log(response.data.choices[0].text)
  words = words.map(v => {
    return v.id === id ? { ...v, A: response.data.choices[0].text! } : v
  })

  prompt = words.map(v => 'Q: ' + v.Q + '\nA: ' + v.A).join('\n')
  console.clear()
  console.log(prompt)
})

// const imageRes = await openai.createImage({
//   prompt: "洱海的水",
//   n: 2, //图片张数
//   size: "512x512",
//   response_format: 'b64_json'
// })

// imageRes.data.data.forEach((v, key) => {
//   writeFileSync(join(PUBLIC_PATH, key + '.png'), Buffer.from(v.b64_json!, 'base64'))
// })

// console.log(imageRes.data.data[0])