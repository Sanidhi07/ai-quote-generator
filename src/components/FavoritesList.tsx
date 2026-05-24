import {Quote} from "@/lib/types";

interface FavoritesListProps {
  favorites: Quote[];
  onSelect: (quoteText: string) => void;
  onRemove: (quote: Quote) => void;

}

export default function FavoritesList({favorites, onSelect, onRemove}: FavoritesListProps){
  if(favorites.length === 0) return null;

  return (
    <div className="mt-12 w-full max-w-4xl border-t border-gray-800/50 pt-10">
      <h3 className="text-yellow-500/80 uppercase tracking-[0.3em] text-[10px] font-bold mb-8 text-center">
       {favorites.length > 0 ? "Your Collection" : "No saved gems yet"}
      </h3>
      {favorites.length > 0 &&(
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {
          favorites.map((item)=>(
            <div key={item.text} 
            className="relative p-6 bg-[#0a0a0a] border border-gray-800 rounded-2xl group hover:border-yellow-500/30 transition-all">
              <p onClick={()=>onSelect(item.text)} className="text-gray-300 text-sm italic cursor-pointer line-clamp-3 mb-4 leading-relaxed">
                "{item.text}"
              </p>

              <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold">
                {item.category}
              </span>
              
              <button 
                onClick={() => onRemove(item)}
                className="text-gray-600 hover:text-red-400 transition-colors text-xs"
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