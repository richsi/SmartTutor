import { config } from "dotenv"
import fs from 'fs';
config()

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.API_KEY
})

const training_file = await openai.files.create({ file: fs.createReadStream('mydata.jsonl'), purpose: 'fine-tune' });
const trainingFileName = training_file['id']

const model = 'ft:gpt-3.5-turbo-0613:personal::8EYuJBru'

// const fineTune = await openai.fineTuning.jobs.create({ training_file: trainingFileName, model: 'gpt-3.5-turbo' })

// setInterval(() =>{
// const models = openai.fineTuning.jobs.list('ftjob-8R4m8Ln3meiAHbKq0tqxyBcn', false)
// let page = openai.fineTuning.jobs.list({ limit: 10 });
// page.then((data) => {
//   console.log(data.data[0].status);
// }).catch((error) => {
//   console.log(error);
// }); }, 5000);



const response = await openai.chat.completions.create({
  model: model,
  messages: [
    {
      role: "system",
      content: "You are a factual chatbot that is also sarcastic."
    },
    {
    role: "user",
    content: "What is 1+1?"
    }
  ],
  max_tokens: 1024,
})

console.log(response.choices[0].message.content)
// console.log(fineTune)
