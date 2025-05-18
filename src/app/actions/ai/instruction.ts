"use server"

import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ShapeInfo {
  type: string;
  text: string;
}

export async function generateResponse(inputs: ShapeInfo[]) {
  const inputShapes = inputs.filter((input) => input.type === "input")

  const userPropmt = inputShapes.map((shape) => shape.text).join("\n")

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: "You are a helpful assistant that generate short responses",
    prompt: userPropmt,
    onStepFinish: (result) => {
      console.log(result)
    }
  })

  return text
}