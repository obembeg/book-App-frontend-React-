import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import socket from "../socket";
import { IoAlertCircleOutline } from "react-icons/io5";

function Deleted({ text }) {
  const navigate = useNavigate();

  const {
    deleteOneBook,
    deleteOneUser,
    adminDeleteOneBook,
    setDeleted,
    setAdminDelete,
    setLogOut,
    setIsAuth,
    setDeletedUser,
    setIsAdmin,
  } = useContext(storeContext);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteOneBook();
    setDeleted(false);
  };

  const handleAdminDelete = (e) => {
    e.preventDefault();
    adminDeleteOneBook();
    setAdminDelete(false);
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    deleteOneUser();
    setDeletedUser(false);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    setLogOut(false);
    setIsAuth(false);
    setIsAdmin(false);
    localStorage.removeItem("accesstoken");
    socket.disconnect();
    navigate("/login");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl text-center space-y-6 animate-fade-in-up">
      
      {/* Alert Warning Icon */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-950/40 border border-rose-900/35 text-rose-500 shadow-inner">
        <IoAlertCircleOutline className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-white tracking-tight">Confirm Action</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Are you sure you want to <strong className="text-slate-200">{text}</strong>? This action may be irreversible.
        </p>
      </div>

      {text === "delete book" ? (
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/10 cursor-pointer transition active:scale-95"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white text-xs font-bold rounded-xl cursor-pointer transition active:scale-95"
            onClick={() => setDeleted(false)}
          >
            No, Cancel
          </button>
        </div>
      ) : text === "delete this book" ? (
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/10 cursor-pointer transition active:scale-95"
            onClick={handleAdminDelete}
          >
            Yes, Delete
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-855 text-slate-400 hover:text-white text-xs font-bold rounded-xl cursor-pointer transition active:scale-95"
            onClick={() => setAdminDelete(false)}
          >
            No, Cancel
          </button>
        </div>
      ) : text === "Log Out" ? (
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 px-4 py-2.5 bg-rose-650 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/10 cursor-pointer transition active:scale-95"
            onClick={handleLogOut}
          >
            Yes, Logout
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-855 text-slate-400 hover:text-white text-xs font-bold rounded-xl cursor-pointer transition active:scale-95"
            onClick={() => setLogOut(false)}
          >
            No, Cancel
          </button>
        </div>
      ) : text === "delete this user" ? (
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/10 cursor-pointer transition active:scale-95"
            onClick={handleDeleteUser}
          >
            Yes, Delete
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-855 text-slate-400 hover:text-white text-xs font-bold rounded-xl cursor-pointer transition active:scale-95"
            onClick={() => setDeletedUser(false)}
          >
            No, Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-3 mt-4">
          <button className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg cursor-pointer transition active:scale-95">
            Yes, Confirm
          </button>
        </div>
      )}
    </div>
  );
}

export default Deleted;
