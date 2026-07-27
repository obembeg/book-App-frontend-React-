import React from "react";
import { IoStar } from "react-icons/io5";

function BookCard({ book }) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl hover:border-slate-700/60 transition duration-350 overflow-hidden flex flex-col h-full hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg shadow-slate-950/10">
      
      {/* Cover picture wrapper */}
      <div className="relative overflow-hidden bg-slate-950 aspect-video sm:aspect-3/4">
        <img
          src={book.image || "/placeholder-book.png"}
          alt={book.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col grow space-y-3">
        <div className="space-y-1 grow">
          <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug">
            {book.title}
          </h3>
          <p className="text-xs text-indigo-400 font-semibold">{book.author}</p>
        </div>

        {book.rating && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <IoStar
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(book.rating) ? "text-amber-400" : "text-slate-700"}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500">{book.rating}</span>
          </div>
        )}

        <div className="pt-2">
          <button className="w-full px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition duration-200 cursor-pointer active:scale-95 shadow-md shadow-indigo-600/10">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
