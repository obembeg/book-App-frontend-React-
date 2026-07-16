import React from "react";
import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import { toast } from "react-toastify";

function ForgotPassword() {
  const {
    email,
    setEmail,
    setforgot,
    setIsLoading,
    apiurl,
    isLoading,
    authLoading,
  } = useContext(storeContext);

  async function forgetPassword() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiurl}/password/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
    forgetPassword();
    setEmail("");
    setforgot(false);
  };

  if (isLoading || authLoading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <main className="p-8 sm:p-12 flex flex-col justify-center bg-slate-900/10">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Password Reset
        </h2>
        <p className="text-xs text-slate-400 mt-2 mb-6">
          Enter your email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm placeholder:text-slate-600 transition duration-200"
              placeholder="you@example.com"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/10 transition duration-200 cursor-pointer active:scale-[0.98]"
            >
              Request Reset
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
