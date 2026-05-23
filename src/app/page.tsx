"use client";
import { useState } from "react";

export default function Home(){
const [result, setResult]=useState("");
const [topic,setTopic]=useState("")
const [category,setCategory]=useState("Coding");
const [tone,setTone]=useState("Inspirational")

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
      {/* --- Topic Input --- */}
      <input type="text"
      placeholder="Enter a topic (e.g Coding)"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      className="mt-6 p-2 border border-gray-300 rounded text-white w-64 text-center"
      />

      {/* --- Category Selector --- */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-semibold text-white">Select Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-black text-shadow-white w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Coding">Coding</option>
          <option value="Motivation">Motivation</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Life">Life</option>
        </select>

      </div>
      {/* --- Tone Selector --- */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-semibold text-white">Select Tone:</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-black text-shadow-white w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Inspirational">Inspirational</option>
          <option value="Motivational">Motivational</option>
          <option value="Philosophical">Philosophical</option>
          <option value="Humorous">Humorous</option>
        </select>
      </div>

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