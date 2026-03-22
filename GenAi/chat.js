import { createInterface } from "readline";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "langchain";
import 'dotenv/config'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.API_KEY,
});


const messages = ['hey'];

while (true) {
  const userInput = await rl.question("You:");

  messages.push(new HumanMessage(userInput));
  
  const response = await model.invoke(messages);
  messages.push(response);
  
  console.log(response.text);

}
