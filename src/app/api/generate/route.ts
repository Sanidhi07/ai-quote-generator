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
   const text = result.response.text();
    
    return NextResponse.json({text: text});
  } catch (error) {
  console.error("FULL ERROR:", error);

  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : "Unknown error",
    },
    { status: 500 }
  );
}
}
