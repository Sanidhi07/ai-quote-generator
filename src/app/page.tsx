"use client";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";  
import { copyToClipboard } from "@/lib/utils";
import QuoteHistory from "@/components/QuoteHistory";
import { Quote } from "@/lib/types";
import { getFavorites,toggleFavorite, getHistory, saveToHistory } from "@/lib/storage";
import FavoritesList from "@/components/FavoritesList";


export default function Home(){
const [result, setResult]=useState("");
const [topic,setTopic]=useState("")
const [category,setCategory]=useState("Coding");
const [tone,setTone]=useState("Inspirational");
const [isLoading,setIsLoading]=useState(false);
const [error,setError]=useState("");
const [copied, setCopied] = useState(false);
const [history, setHistory] = useState<Quote[]>([]);
const [favorites, setFavorites] = useState<Quote[]>([]);

useEffect(() => {
  setHistory(getHistory());
  setFavorites(getFavorites());
},[]);

const handleCopy = async () => {
  const success = await copyToClipboard(result);
  if(success){
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  }
};

const handleReset=()=>{
  setTopic("");
  setCategory("Coding");
  setTone("Inspirational");
  setResult("");
  setError("");
};

const handleRegenerate=()=>{
  if(topic){
    testAI();
  }else{
    setError("Please enter a topic to regenerate a quote.");
  }
}

const handleToggleFavorite = (quote: Quote) => {
  toggleFavorite(quote);
  setFavorites(getFavorites());
}
const testAI = async () => {
  setIsLoading(true);
  setResult("");
  setError("");

  // --- MOCK LOGIC (Active while API is on quota limit) ---
  setTimeout(() => {
    const mockQuotes = [
      "The only way to do great work is to love what you do.",
      "Logic will get you from A to B. Imagination will take you everywhere.",
      "Code is like humor. When you have to explain it, it’s bad.",
      "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
    ];
    const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
    
    setResult(randomQuote);

    const newQuote: Quote = {
      id: Date.now().toString(),
      text: randomQuote,
      topic,
      category,
      tone,
      timestamp: Date.now(),
    };

    saveToHistory(newQuote);
    setHistory(getHistory());
    setIsLoading(false);
  }, 800); 

  /* // --- REAL API LOGIC---
  const dynamicPrompt = `Give me a short, unique ${tone} quote about ${topic || "coding"} in the category of ${category}.`;
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: dynamicPrompt }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("API Limit reached. Try again later.");
      throw new Error("Failed to fetch from API");
    }

    const data = await res.json();
    if (data.text) {
      setResult(data.text);
      const newQuote: Quote = {
        id: Date.now().toString(),
        text: data.text,
        topic, category, tone,
        timestamp: Date.now(),
      };
      saveToHistory(newQuote);
      setHistory(getHistory());
    }
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
  */
};
return(
  <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-24 gap-6 md:gap-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold text-center">AI Quote Generator</h1>

      

      {/* --- Replaced with UI Input --- */}
      <Input
        placeholder="Enter a topic (e.g Coding)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      
      {/* Selects Container - Stacks on mobile, side-by-side on tablet+ */}
   
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
        </div>
     

      {/* --- Replaced with UI Button --- */}
      <div className="flex flex-col md:flex-row gap-3 w-full max-w-sm px-5 mt-6 ">
        <Button
        onClick={testAI}
        isLoading={isLoading}
        className="flex-[2]"
        >
        Generate Quote
        </Button>
  
        <Button 
        onClick={handleReset} 
        className="flex-1 bg-transparent border border-gray-800 text-gray-500 hover:text-white hover:bg-gray-800 hover:border-gray-700 transition-all duration-300">
        Reset
        </Button>
     </div>
      

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
        <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-1000 ease-in-out">
          <p className="italic text-lg font-serif leading-relaxed text-gray-100 ">"{result}"</p>

          <div className="flex justify-center gap-4 mt-6">
            {/* Copy Button */}
            <button onClick={handleCopy} 
            className={`text-xs font-medium transition-all duration-200 flex items-center gap-2 px-4 py-2 rounded-full border ${
            copied 
            ? "border-green-500 text-green-400 bg-green-500/10" 
            : "border-purple-900/50 text-purple-400 hover:text-purple-300 bg-purple-900/10"
            }`}>
              {copied ? (<><span>✅</span> Copied!</>) : (<><span>📋</span> Copy to Clipboard</>)}
            </button>

            {/* Regenerate Button*/}
            <button onClick={handleRegenerate} className="text-xs font-medium text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50">
              <span>🔄</span> Regenerate
            </button>

            {/* Favorite Button */}
            <button onClick={()=>{
              const currentQuote: Quote={
                id: Date.now().toString(),
                text:result,
                topic,
                category,
                tone,
                timestamp:Date.now(),
              };
              handleToggleFavorite(currentQuote);
            }} 
            className={`text-xs font-medium transition-all duration-200 flex items-center gap-2 px-4 py-2 rounded-full border ${
              favorites.some(item => item.text === result)
              ? "border-yellow-500 text-yellow-500 bg-yellow-500/10" 
              : "border-gray-800 text-gray-400 hover:text-yellow-500 bg-gray-900/50"
            }`}>
              {
              favorites.some(item => item.text === result)
              ? (<><span>⭐</span> Unfavorite</>) 
              : (<><span>☆</span> Favorite</>)
              }
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

      <QuoteHistory history={history} onSelect={(text) => setResult(text)} />
      <FavoritesList favorites={favorites} onSelect={(text) => setResult(text)} onRemove={(quote) => handleToggleFavorite(quote)} />
    </main>
    )
}