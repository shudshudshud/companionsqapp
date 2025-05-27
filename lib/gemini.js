import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_AI_API_KEY

if (!apiKey) {
  throw new Error('Missing Google AI API key')
}

const genAI = new GoogleGenerativeAI(apiKey)
export const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })