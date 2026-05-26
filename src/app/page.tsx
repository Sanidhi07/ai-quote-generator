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
import { ThemeToggle } from "@/components/ThemeToggle";

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
const [activeTab, setActiveTab] = useState<"history" | "favorites">("history");

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
  
};
return(
  <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-24 gap-6 md:gap-8 max-w-4xl mx-auto transition-colors duration-300">
    
    {/* 2. Added the Toggle Button */}
    <ThemeToggle />

<h1 className="text-4xl md:text-6xl font-black text-center tracking-tight transition-all pb-2 bg-linear-to-r dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 
  bg-clip-text text-transparent animate-in fade-in slide-in-from-top-6 duration-1000">
  AI Quote Generator
</h1>
    
      <Input
        placeholder="Enter a topic (e.g Coding)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="shadow-sm border-slate-200 dark:border-gray-700"/>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Select Category:"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-slate-200 dark:border-gray-800 shadow-sm"
        >
          <option value="Coding">Coding</option>
          <option value="Motivation">Motivation</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Life">Life</option>
        </Select>

        <Select
          label="Select Tone:"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="border-slate-200 dark:border-gray-800 shadow-sm"
        >
          <option value="Inspirational">Inspirational</option>
          <option value="Motivational">Motivational</option>
          <option value="Philosophical">Philosophical</option>
          <option value="Humorous">Humorous</option>
        </Select>
      </div>
    

    {/* 4. Refined Button Container spacing */}
    <div className="flex flex-col md:flex-row gap-3 w-full max-w-sm mt-6">
      <Button
        onClick={testAI}
        isLoading={isLoading}
        className="flex-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-[1.03] active:scale-[0.97] text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all duration-300"
      >
        Generate Quote
      </Button>

      <Button 
        onClick={handleReset} 
        className="flex-1 bg-gray-700 dark:bg-transparent border border-slate-200 dark:border-gray-800 text-slate-600 dark:text-gray-400  hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
      >
        Reset
      </Button>
    </div>

    {/* 5. Quote Card Colors */}
    {!isLoading && result && (
      <Card className="w-full max-w-2xl border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-950 shadow-xl shadow-slate-200/60 dark:shadow-none animate-in fade-in zoom-in-95 duration-1000">
        <p className="italic text-xl font-serif leading-relaxed text-slate-800 dark:text-gray-100 text-center">
          "{result}"
        </p>

       <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button onClick={handleCopy} 
            className={`text-xs font-bold transition-all duration-200 flex items-center gap-2 px-5 py-2.5 rounded-full border ${
              copied 
              ? "border-green-500 text-green-600 bg-green-50" 
              : "border-indigo-100 dark:border-purple-900/50 text-indigo-600 dark:text-purple-400 bg-indigo-50 dark:bg-purple-900/10 hover:bg-indigo-100"
            }`}>
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
          
          
          <button onClick={handleRegenerate}
            className="text-xs font-bold transition-all duration-200 flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 hover:bg-blue-100">
            🔄 Regenerate
          </button>  

        <button onClick={() => handleToggleFavorite({
            id: Date.now().toString(),
            text: result,   
            topic,
            category,
            tone,
            timestamp: Date.now(),
          })} 
            className={`text-xs font-bold transition-all duration-200 flex items-center gap-2 px-5 py-2.5 rounded-full border ${favorites.some(fav => fav.text === result) 
              ? "border-amber-400 text-amber-600 bg-amber-50" 
              : "border-slate-200 dark:border-gray-700 text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-900/10 hover:bg-slate-100"      
            }`}>
            {favorites.some(fav => fav.text === result) ? "⭐ Unfavorite" : "☆ Favorite"}
          </button>
        </div>
      </Card>
    )}

  
<div className=" bg-linear-to-r from-indigo-600 via-blue-500 to-pink-400 flex flex-col items-center w-full p-4 mt-8 rounded-2xl shadow-lg  animate-in  fade-in slide-in-from-bottom-2 duration-1000"> 
  <div className="flex p-1 bg-slate-100 dark:bg-purple-800/30 backdrop-blur-sm rounded-2xl w-full max-w-[320px] border border-slate-200 dark:border-slate-700 shadow-inner">
    <button
      onClick={() => setActiveTab('history')}
      className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
        activeTab === 'history'
          ? 'text-white dark:bg-pink-400/30 shadow-md'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
      }`}
    >
      Recent
    </button>
    <button
      onClick={() => setActiveTab('favorites')}
      className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
        activeTab === 'favorites'
          ? 'text-white dark:bg-pink-400/30  shadow-md'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
      }`}
    >
      Collection
    </button>
  </div>

  <div className="bg-green-500/30 w-full max-w-5xl mt-6 rounded-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-500">
    {activeTab === 'history' ? (
      <QuoteHistory 
        history={history} 
        onSelect={(text) => setResult(text)} 
      />
    ) : (
      <FavoritesList 
        favorites={favorites} 
        onSelect={(text) => setResult(text)} 
        onRemove={handleToggleFavorite} 
      />
    )}
  </div>
</div>
  </main>
);
    
}