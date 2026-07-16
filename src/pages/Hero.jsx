import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="grow bg-mesh-glow flex flex-col justify-center animate-fade-in-up">
      <div className="max-w-7xl mx-auto w-full px-6 py-12 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-800/30 text-indigo-400 text-sm font-semibold tracking-wide shadow-inner">
              ✨ Welcome to the future of reading
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Discover & Organize{" "}
              <span className="block mt-2 bg-linear-to-r from-indigo-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
                Amazing Books
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore thousands of books across multiple genres and authors. Track your reading progress, customize your collections, and share your favorite reads.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button 
                onClick={handleLogin}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-100 hover:scale-[1.02] active:scale-95 transition duration-200 cursor-pointer shadow-lg shadow-white/5"
              >
                Sign In
              </button>

              <button 
                onClick={handleRegister}
                className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 transition duration-200 cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                Get Started Free
              </button>
            </div>

            {/* Quick Stat Bar */}
            <div className="pt-8 border-t border-slate-900 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-white">10k+</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Books</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-white">4.8★</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Rating</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-white">5k+</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Active Readers</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visuals */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Glowing blur vector background */}
            <div className="absolute w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -top-10 -left-10 z-0"></div>
            <div className="absolute w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -bottom-10 -right-10 z-0"></div>
            
            <div className="relative z-10 w-full max-w-md p-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-[2.5rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                alt="Stack of modern books"
                className="w-full aspect-4/3 object-cover rounded-4xl shadow-xl hover:scale-[1.01] transition duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;
