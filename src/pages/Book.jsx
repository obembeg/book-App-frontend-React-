import { useParams } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { useEffect } from "react";
import { useContext } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import {
  IoArrowBackOutline,
  IoFolderOpenOutline,
  IoPricetagOutline,
  IoBookOutline,
  IoReaderOutline,
  IoBookmarkOutline
} from "react-icons/io5";

function Book() {
  const { id } = useParams();
  const { getOneBook, books, category, isLoading } = useContext(storeContext);

  useEffect(() => {
    getOneBook(id);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  // Generate initials for the custom book cover mock
  const bookInitials = books?.title
    ? books.title
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "PB";

  return (
    <div className="grow bg-mesh-glow min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-850">
          
          {/* Left Side: Custom Vector Book Cover Mockup */}
          <div className="md:w-1/2 p-8 sm:p-12 flex items-center justify-center bg-linear-to-b from-indigo-950/20 to-slate-950/20">
            <div className="w-56 h-80 sm:w-64 sm:h-96 rounded-2xl bg-linear-to-br from-indigo-900 via-indigo-950 to-slate-950 border border-indigo-700/35 relative overflow-hidden shadow-2xl flex flex-col justify-between p-6 sm:p-8 hover:scale-[1.01] transition duration-300 group">
              {/* Cover top decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-indigo-500 to-purple-500"></div>
              {/* Cover background graphic pattern */}
              <div className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/15 transition duration-500"></div>
              
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950 border border-indigo-900/35 px-2 py-0.5 rounded uppercase tracking-widest">
                  Library Edition
                </span>
                <IoBookmarkOutline className="w-5 h-5 text-indigo-500" />
              </div>

              {/* Title Initials Graphic */}
              <div className="my-auto flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-950 border border-indigo-800/50 flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-white shadow-xl">
                  {bookInitials}
                </div>
                <h3 className="text-center font-extrabold text-white text-base sm:text-lg mt-4 line-clamp-2 leading-snug px-2">
                  {books?.title}
                </h3>
              </div>

              {/* Cover bottom branding */}
              <div className="flex items-center gap-1.5 border-t border-slate-800/60 pt-4 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                <IoBookOutline className="w-3.5 h-3.5 text-slate-400" />
                <span>PageFlow</span>
              </div>
            </div>
          </div>

          {/* Right Side: Information Details */}
          <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header Title & Author */}
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-indigo-950/40 border border-indigo-900/35 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  <IoFolderOpenOutline className="w-3 h-3" />
                  {category?.name || "General"}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {books?.title}
                </h1>
                <p className="text-slate-400 text-sm">
                  by <strong className="text-slate-200">{books?.author || "Unknown"}</strong>
                </p>
              </div>

              {/* Pricing badge */}
              <div className="flex items-center gap-2 text-2xl font-extrabold text-white">
                <IoPricetagOutline className="w-6 h-6 text-emerald-400" />
                <span>₦{books?.price && books.price !== "0" && books.price !== "0.00" ? Number(books.price).toLocaleString() : " Free"}</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="flex-1 sm:flex-none px-4 py-2.5 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition duration-200 active:scale-95 cursor-pointer"
                >
                  <IoArrowBackOutline className="w-4 h-4" />
                  Back Workspace
                </Link>
                <button className="flex-1 sm:flex-none px-4 py-2.5 flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition duration-200 active:scale-95 cursor-pointer">
                  <IoReaderOutline className="w-4 h-4" />
                  Read Preview
                </button>
              </div>

              {/* Description box */}
              <div className="space-y-2 pt-4 border-t border-slate-850">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</h3>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto pr-2">
                  {books?.description || "No plot synopsis was uploaded for this publication."}
                </p>
              </div>
            </div>

            {/* Additional Meta details list */}
            <div className="grid grid-cols-2 gap-4 text-xs pt-6 border-t border-slate-850 mt-6">
              <div className="space-y-1">
                <span className="block text-slate-500 uppercase font-bold tracking-wider text-[10px]">Publisher</span>
                <span className="font-semibold text-slate-300">{books?.publisher || "Independent"}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-slate-500 uppercase font-bold tracking-wider text-[10px]">Page Count</span>
                <span className="font-semibold text-slate-300">{books?.pages ? `${books.pages} pages` : "—"}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
