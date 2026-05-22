"use client";
import { useState } from "react";

export default function Home(){
const [result, setResult]=useState("");

const testAI=async()=>{
  const res=await fetch("/api/generate",{
    method:"Post",
    body:JSON.stringify({prompt:"Give me a short inspirational quote about coding."}),

  });
  console.log("Api status",res);
  const data=await res.json();
  console.log("AI Data:", data);
  setResult(data.text || data.error);
};
return(
  <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">AI Quote Generator</h1>
      <button 
        onClick={testAI}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test AI Connection
      </button>
      {result && <p className="mt-8 italic text-center text-lg">"{result}"</p>}
    </main>

)
}