"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";  
import { copyToClipboard } from "@/lib/utils";


export default function Home(){
const [result, setResult]=useState("");
const [topic,setTopic]=useState("")
const [category,setCategory]=useState("Coding");
const [tone,setTone]=useState("Inspirational");
const [isLoading,setIsLoading]=useState(false);
const [error,setError]=useState("");
const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  const success = await copyToClipboard(result);
  if(success){
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  }
};

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

      {/* --- Replaced with UI Input --- */}
      <Input
        placeholder="Enter a topic (e.g Coding)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      

      {/* --- Replaced with UI Selects --- */}
      <Select
        label="Select Category:"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Coding">Coding</option>
        <option value="Motivation">Motivation</option>
        <option value="Philosophy">Philosophy</option>
        <option value="Life">Life</option>
        </Select>

    

      {/* --- Tone Selector --- */}
        <Select
          label="Select Tone:"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="Inspirational">Inspirational</option>
          <option value="Motivational">Motivational</option>
          <option value="Philosophical">Philosophical</option>
          <option value="Humorous">Humorous</option>
        </Select>
      

      {/* --- Replaced with UI Button --- */}
      <Button
        onClick={testAI}
        isLoading={isLoading}
      >
        Generate Quote
      </Button>

      {/* --- Error Message --- */}
      {error && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-500 text-red-200 rounded-lg text-sm">
        {error}
        </div>
    )}

      {/* --- Replaced with UI Card --- */}
      {isLoading && (
        <Card className="border-gray-700 animate-pulse">
          <p className="text-gray-500 italic text-lg font-serif">Thinking of a masterpiece...</p>
        </Card>
      )}

   
      {!isLoading && result && (
        <Card>
          <p className="italic text-lg font-serif leading-relaxed text-gray-100">"{result}"</p>

          <div className="flex justify-center mt-6">
            <button onClick={handleCopy} 
            className={`text-xs font-medium transition-all duration-200 flex items-center gap-2 px-4 py-2 rounded-full border ${
            copied 
            ? "border-green-500 text-green-400 bg-green-500/10" 
            : "border-purple-900/50 text-purple-400 hover:text-purple-300 bg-purple-900/10"
            }`}>
              {copied ? (<><span>✅</span> Copied!</>) : (<><span>📋</span> Copy to Clipboard</>)}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-500 flex justify-center gap-4 text-[10px] uppercase tracking-widest text-gray-500 font-medium">
            <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">{category}</span>
            <span className="text-gray-700">•</span>
            <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded">{tone}</span>
          </div>
        </Card>
      )
      }
    </main>
    )
}