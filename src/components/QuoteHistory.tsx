import { Quote } from "@/lib/types";

interface QuoteHistoryProps {
  history: Quote[];
  onSelect: (quoteText: string) => void;
}

export default function QuoteHistory({ history, onSelect }: QuoteHistoryProps) {
 if (history.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-3xl animate-in fade-in zoom-in-95 duration-500">
        <div className="text-4xl mb-4">✍️</div>
        <p className="text-slate-500 dark:text-gray-400 font-medium text-sm text-center">Your history is currently empty.</p>
        <p className="text-slate-400 dark:text-gray-600 text-xs mt-1 text-center">Generate your first quote above to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="mt-2 w-full animate-in fade-in slide-in-from-top-4 duration-700">
      <h3 className="text-black dark:text-white-600 uppercase tracking-[0.2em] text-[12px] font-bold mb-8 text-center">
        Recent Generations
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.text)}
            className="p-5 bg-white dark:bg-[#111111]/50 border border-slate-200 dark:border-gray-800 rounded-2xl cursor-pointer hover:border-indigo-500/40 dark:hover:border-purple-500/40 transition-all group backdrop-blur-sm shadow-sm hover:shadow-md"
          >
            <p className="text-slate-600 dark:text-gray-300 text-sm italic line-clamp-3 group-hover:text-slate-900 dark:group-hover:text-gray-200 transition-colors leading-relaxed">
              "{item.text}"
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[9px] bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-800 text-slate-500 dark:text-gray-500 px-2 py-0.5 rounded-md uppercase tracking-wider font-bold">
                {item.category}
              </span>
              <span className="text-slate-300 dark:text-gray-500 text-[10px]">•</span>
              <span className="text-[9px] text-slate-400 dark:text-gray-500 font-medium">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}