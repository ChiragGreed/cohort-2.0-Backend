import { createAgent, tool, HumanMessage } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import readline from "readline/promises";
import * as z from 'zod'
import 'dotenv/config'

import sendEmail from "./services/emailService.js";
import tavilySearch from "./services/tavilyService.js";



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.API_KEY,
});



const emailSendTool = tool(

  sendEmail,
  {
    name: "emailSending",
    description: "Tool for sending an email to someone",
    schema: z.object({
      to: z.string().describe("Email address of the recipient"),
      subject: z.string().describe("Subject of the email we are sending"),
      html: z.string().describe("Html format of the email , use some good formating")
    })
  }
)

const tavilySearchTool = tool(
  tavilySearch,
  {
    name: "web_search",
    description: `Search the internet for real-time or latest information.
    Use this tool when:
- question asks about current events
- sports matches today
- weather
- latest news
- current date
- live information
`,
    schema: z.object({
      query: z.string()
    })

  }
)

const agent = createAgent({
  model,
  tools: [emailSendTool, tavilySearchTool],
  systemPrompt: `
whenever you are told to send emails.

      Important:
- Only send ONE email per user request
- Never resend previous emails
- Ignore previous tool calls
  `

})

const messages = [];

while (true) {

  const userInput = await rl.question("You: ");

  messages.push(new HumanMessage(userInput));

  const response = await agent.invoke({ messages });

  console.log(response.messages[response.messages.length - 1].content);

  messages.push(response.messages[response.messages.length - 1]);
}
