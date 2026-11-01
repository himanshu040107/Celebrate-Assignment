import React from "react";
import { Heart } from "lucide-react";
const Cards = ({ id, photoURL, author, isFavourite, onToggleFavourite }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex flex-col items-center">
        <img
          src={photoURL}
          alt={`Photo ${id}`}
          className="w-full h-48 object-cover mb-4"
        />
        <div className="flex items-center justify-between w-full">
          <h4 className="font-bold text-[#58684c] font-mono">{author}</h4>
          <button type="button" onClick={onToggleFavourite} aria-label={`${isFavourite ? 'Remove' : 'Add'} ${author} ${isFavourite ? 'from' : 'to'} favourites`} aria-pressed={isFavourite}>
            <Heart className={`h-6 w-6 mt-2 ${isFavourite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
