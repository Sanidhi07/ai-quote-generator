import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const result = await model.generateContent(prompt);

    const response=await result.response;
    const text=response.text();
    
    return NextResponse.json({text: text});
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "Unable to generate content." },
      { status: 500 }
    );
  }
}
