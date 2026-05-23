"use client";
import { useState } from "react";

export default function Home(){
const [result, setResult]=useState("");
const [topic,setTopic]=useState("")


const testAI=async()=>{

 
  setResult("Crafting your quote...");
  setTimeout(() => {
    setResult(`The soul of ${topic || "coding"} is found in the details of the journey.`);
  }, 1000);

  /*const res=await fetch("/api/generate",{
    method:"Post",
      headers: {
   "Content-Type": "application/json",
   },
    body:JSON.stringify({prompt:"Give me a short inspirational quote about coding."}),

  });
  console.log("Api status",res);
  const data=await res.json();
   console.log("AI Data:", data);
  setResult(data.text || data.error);*/
};
return(
  <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">AI Quote Generator</h1>
      {/* Topic Input */}
      <input type="text"
      placeholder="Enter a topic (e.g Coding)"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      className="mt-6 p-2 border border-gray-300 rounded text-white w-64 text-center"
      />

      <button 
        onClick={testAI}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Quote
      </button>
      {result && <p className="mt-8 italic text-center text-lg">"{result}"</p>}
    </main>

)
}