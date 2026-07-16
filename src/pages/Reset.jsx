import React from "react";
import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

function Reset() {
  const {
    setPassword,
    password,
    confirmPassword,
    setConfirmPassword,
    setIsLoading,
    apiurl,
    isLoading,
    authLoading,
    showPassword,
    setShowPassword,
  } = useContext(storeContext);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();
  async function resetPassword() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/password/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
      } else {
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
    resetPassword();
    setPassword("");
    navigate("/login");
  };

  if (isLoading || authLoading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950/90 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl shadow-indigo-950/20 animate-fade-in-up overflow-hidden">
        <main className="p-6 sm:p-10 flex flex-col justify-center bg-slate-900/10">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Password Reset
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Enter your new password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
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
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Confirm Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            {password === confirmPassword &&
            password.length > 0 &&
            confirmPassword.length > 0 ? (
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/10 transition duration-200 cursor-pointer active:scale-[0.98]"
                >
                  Reset Password
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <div
                  className="w-full flex justify-center items-center px-4 py-3 bg-indigo-500  text-grey text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/10 transition duration-200  active:scale-[0.98]"
                >
                  Reset Password
                </div>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

export default Reset;
