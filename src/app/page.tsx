"use client";
import { useState } from "react";

export default function Home(){
const [result, setResult]=useState("");
const [topic,setTopic]=useState("")
const [category,setCategory]=useState("Coding");
const [tone,setTone]=useState("Inspirational");
const [isLoading,setIsLoading]=useState(false);
const [error,setError]=useState("");

const testAI=async()=>{
  setIsLoading(true);
  setResult("");
  setError("");

  // Construct the dynamic prompt
  const dynamicPrompt = `Give me a short, unique ${tone} quote about ${topic || "coding"} in the category of ${category}.`;  console.log("Generated Prompt:", dynamicPrompt);
  try{
    const res = await fetch("/api/generate", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: dynamicPrompt }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch from API");
    }

    const data = await res.json();

    //Set the real AI result
    if (data.text) {
      setResult(data.text);
    } else if (data.error) {
      setError(data.error);
    }
  } catch (err) {
    console.error("API Error:", err);
    setError("Failed to generate quote. Please check your connection.");  
  } finally {
    setIsLoading(false);
  }

  

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
          className="p-2 border border-gray-300 rounded bg-black text-white w-64 focus:ring-2 focus:ring-blue-500 outline-none"
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
          className="p-2 border border-gray-300 rounded bg-black text-white w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="Inspirational">Inspirational</option>
          <option value="Motivational">Motivational</option>
          <option value="Philosophical">Philosophical</option>
          <option value="Humorous">Humorous</option>
        </select>
      </div>

      {/* --- Generate Button --- */}
      <button 
        onClick={testAI}
        disabled={isLoading}
        className={`mt-4 px-4 py-2 text-white rounded transition-colors ${
        isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Generating..." : "Generate Quote"}
      </button>

      {/* --- Error Message --- */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-500 text-red-200 rounded-lg text-sm">
        {error}
        </div>
    )}

      {/* --- Loading Placeholder --- */}
      {isLoading && (
        <div className="mt-10 p-8 max-w-lg w-full bg-[#111111] border-2 border-gray-700 rounded-2xl animate-pulse text-center">
          <p className="text-gray-500 italic text-lg font-serif">Thinking of a masterpiece...</p>
        </div>
      )}

      {/* --- Quote Card --- */}
      {!isLoading && result && (
        <div className="mt-10 p-8 max-w-lg bg-[#111111] border-2 border-purple-400 rounded-2xl shadow-xl text-center transform transition-all animate-in fade-in zoom-in duration-500">
          <p className="italic text-lg font-serif leading-relaxed text-gray-100">"{result}"</p>


          <div className="mt-6 pt-4 border-t border-gray-500 flex justify-center gap-4 text-[10px] uppercase tracking-widest text-gray-500 font-medium">
            <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">{category}</span>
            <span className="text-gray-700">•</span>
            <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">{tone}</span>
          </div>
        </div>
      )
      }
    </main>
    )
}