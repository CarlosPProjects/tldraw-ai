"use server"

import { createOpenAI } from "@ai-sdk/openai"
import { experimental_generateImage as generateImage } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAIImage(prompt: string) {
  const { image } = await generateImage({
    model: openai.image("dall-e-3"),
    prompt: prompt,
    size: "1024x1024",
  })

  return {
    success: true,
    imageData: image.base64,
    mimeType: image.mimeType
  }
}