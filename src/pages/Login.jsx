import { Link } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import ForgotPassword from "./ForgotPassword";

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    apiurl,
    isLoading,
    setIsLoading,
    authLoading,
    setAuthLoading,
    setIsAuth,
    setToken,
    forgot,
    setforgot,
  } = useContext(storeContext);

  const navigate = useNavigate();

  setTimeout(() => {
    setAuthLoading(false);
  }, 600);

  async function login() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
        setIsAuth(true);

        navigate("/dashboard");

        localStorage.setItem("accesstoken", data.accesstoken);
        setToken(data.accesstoken);
      } else if (!response.ok || response.status === 401) {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    setEmail("");
    setPassword("");
  };

  if (isLoading || authLoading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  if (forgot) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <ForgotPassword />
      </div>
    );
  }

  return (
    <div className="grow bg-mesh-glow min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-950/20 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Side Panel (Visible on Desktop) */}
          <aside className="hidden md:flex flex-col justify-between p-12 bg-linear-to-b from-indigo-950/40 to-slate-950/40 border-r border-slate-800/50">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold bg-linear-to-r from-indigo-200 to-white bg-clip-text text-transparent">
                Welcome Back
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Sign in to continue and resume where you left off. Access your
                personalized lists and explore new titles.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800/60">
              <blockquote className="text-base text-slate-300 leading-relaxed italic font-medium">
                "A room without books is like a body without a soul."
              </blockquote>
              <cite className="block text-xs text-indigo-400 font-semibold not-italic tracking-wider uppercase">
                &mdash; Marcus Tullius Cicero
              </cite>
            </div>
          </aside>

          {/* Form Content */}
          <main className="p-8 sm:p-12 flex flex-col justify-center bg-slate-900/10">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-xs text-slate-400 mt-2 mb-6">
              Enter your credentials to access your account.
            </p>

            {/* Google Authentication Section */}
            <div className="mb-6 flex justify-start">
              <div className="w-full rounded-xl overflow-hidden p-1 flex justify-center hover:border-slate-700 transition duration-200">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      setIsLoading(true);
                      const response = await fetch(`${apiurl}/auth/google`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          googleToken: credentialResponse.credential,
                        }),
                      });

                      const data = await response.json();
                      console.log(data);

                      if (response.ok) {
                        localStorage.setItem("accesstoken", data.accesstoken);
                        setToken(data.accesstoken);
                        setIsAuth(true);

                        toast.success("Login Success");
                        navigate("/dashboard");
                      } else {
                        toast.error(data.message);
                      }
                      setIsLoading(false);
                    } catch (error) {
                      setIsLoading(false);
                      console.error(error);
                    }
                  }}
                />
              </div>
            </div>

            <div className="relative mb-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-950 px-3 text-slate-500 font-medium tracking-widest">
                  Or login with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                  className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-600 transition duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition duration-200"
                    onClick={() => {
                      (setEmail(email), setforgot(true));
                    }}
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-4 pr-12 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-600 transition duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition duration-200 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEye className="w-4 h-4" />
                    ) : (
                      <FaEyeSlash className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/10 transition duration-200 cursor-pointer active:scale-[0.98]"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-slate-400">
              New here?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-400 hover:text-indigo-300 transition duration-200"
              >
                Create an account
              </Link>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
