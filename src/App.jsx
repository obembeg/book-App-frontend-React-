import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeContext } from "./context/storeContext";
import { useContext, useEffect } from "react";
import Spinner from "./layout/Spinner";
import Book from "./pages/Book";
import Reset from "./pages/Reset";
import Features from "./pages/Features";
import ScrollToTop from "./ScrollToTop";

function App() {
  const { authLoading, setAuthLoading, isAuth } = useContext(storeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // if (authLoading) {
  //   return (
  //     <div className="fixed inset-0 backdrop-blur-sm bg-white/20 grow flex items-center justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <ScrollToTop />
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          transition={Slide}
          theme="dark"
          toastClassName={() =>
            "bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl p-4 shadow-2xl"
          }
          bodyClassName={() => "p-0"}
          progressClassName="bg-indigo-500"
        />
        <main className="grow flex flex-col">
          <Routes>
            <Route path="/" element={isAuth ? <Dashboard /> : <Hero />} />

            <Route path="/login" element={isAuth ? <Dashboard /> : <Login />} />

            <Route
              path="/register"
              element={isAuth ? <Dashboard /> : <Register />}
            />

            <Route
              path="/dashboard"
              element={isAuth ? <Dashboard /> : <Login />}
            />

            <Route path="/profile" element={isAuth ? <Profile /> : <Hero />} />

            <Route path="/book/:id" element={isAuth ? <Book /> : <Login />} />

            <Route
              path="/reset-password"
              element={isAuth ? <Dashboard /> : <Reset />}
            />

            <Route path="/features" element={<Features />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
