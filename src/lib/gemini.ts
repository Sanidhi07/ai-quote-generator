import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const client = new GoogleGenerativeAI(apiKey);


export const model = client.getGenerativeModel({
  model: "gemini-1.5-flash-001", 
});