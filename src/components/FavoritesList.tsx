import {Quote} from "@/lib/types";

interface FavoritesListProps {
  favorites: Quote[];
  onSelect: (quoteText: string) => void;
  onRemove: (quote: Quote) => void;

}

export default function FavoritesList({favorites, onSelect, onRemove}: FavoritesListProps){
  if (favorites.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 dark:border-gray-800 rounded-3xl animate-in fade-in zoom-in-95 duration-500">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">No saved gems yet.</p>
        <p className="text-slate-400 dark:text-gray-600 text-xs mt-1 text-center">Your favorite quotes will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mt-2 w-full border-gray-800/50 p-2">
      <h3 className="text-black dark:text-white-600 uppercase tracking-[0.2em] text-[12px] font-bold mb-8 text-center">
        Your Collection
      </h3>
      {favorites.length > 0 &&(
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {
          favorites.map((item)=>(
            <div key={item.text} 
            className="p-5 bg-white dark:bg-[#111111]/50 border border-slate-200 dark:border-gray-800 rounded-2xl cursor-pointer hover:border-indigo-500/40 dark:hover:border-purple-500/40 transition-all group backdrop-blur-sm shadow-sm hover:shadow-md">
              <p onClick={()=>onSelect(item.text)} className="text-gray-300 text-sm italic cursor-pointer line-clamp-3 mb-4 leading-relaxed">
                "{item.text}"
              </p>

              <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
                {item.category}
              </span>
              
              <button 
                onClick={() => onRemove(item)}
                className="text-red-300/70 hover:text-red-600 transition-colors text-xs"
                title="Remove from favorites"
              >
                Delete
              </button>
            </div>

            </div>
          ))        
        }
      </div>
      )}
    </div>
  )

}