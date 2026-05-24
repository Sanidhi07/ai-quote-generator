import { Quote } from "@/lib/types";

interface QuoteHistoryProps {
  history: Quote[];
  onSelect: (quoteText: string) => void;
}

export default function QuoteHistory({ history, onSelect }: QuoteHistoryProps) {
  if (history.length === 0) return null;
  
  return (
    <div className="mt-16 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-6 px-2 text-center">
        Recent Generations
      </h3>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.text)}
            className="p-5 bg-[#111111]/50 border border-gray-800 rounded-2xl cursor-pointer hover:border-purple-500/40 transition-all group backdrop-blur-sm"
          >
            <p className="text=gray-400 text-sm italic line-clamp-2 group-hover:text-gray-200 transition-colors leading-relaxed">
              "{item.text}"
            </p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[9px] bg-gray-900 border border-gray-800 text-gray-500 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {item.category}
              </span>
              <span className="text-gray-700 text-[10px]">•</span>
              <span className="text-[9px] text-gray-600 font-medium">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>

            </div>
          </div>
        ))}

      </div>
    </div>
  )
}