import React from 'react';
import { useContext } from "react";
import { storeContext } from "../context/storeContext";
import {
  IoNotificationsOutline,
  IoCloseOutline,
  IoInformationCircleOutline
} from "react-icons/io5";

function Noticeboard() {
  const { unreadCount, notifications, setNoticeBox } = useContext(storeContext);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl max-h-[85vh] flex flex-col justify-between animate-fade-in-up">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-950/40 border border-indigo-900/35 rounded-xl text-indigo-400">
            <IoNotificationsOutline className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">Noticeboard</h2>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {unreadCount > 0 ? `${unreadCount} unread updates` : "All caught up!"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setNoticeBox(false)}
          className="p-1.5 rounded-lg text-slate-450 hover:text-white hover:bg-slate-950 border border-slate-850 cursor-pointer transition focus:outline-none"
        >
          <IoCloseOutline className="w-5 h-5" />
        </button>
      </div>

      {/* Notifications Scroll Area */}
      <div className="grow overflow-y-auto my-6 pr-2 space-y-4 max-h-[50vh]">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 bg-slate-950/50 hover:bg-slate-950 border border-slate-850/80 rounded-2xl hover:border-slate-800 transition duration-200 flex gap-3.5 items-start"
            >
              <div className="p-1.5 mt-0.5 bg-indigo-950 text-indigo-400 rounded-lg">
                <IoInformationCircleOutline className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white leading-snug">
                  {notification.title}
                </h4>
                <p className="text-slate-450 text-xs leading-relaxed">
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-500 font-medium space-y-3">
            <IoNotificationsOutline className="w-8 h-8 text-slate-650 mx-auto opacity-40" />
            <p className="text-sm">Your noticeboard is empty.</p>
          </div>
        )}
      </div>

      {/* Modal Footer Controls */}
      <div className="pt-4 border-t border-slate-800/60 flex justify-end">
        <button
          onClick={() => setNoticeBox(false)}
          className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-450 hover:text-white text-xs font-bold rounded-xl transition duration-200 cursor-pointer active:scale-95 shadow-inner"
        >
          Close Panel
        </button>
      </div>

    </div>
  );
}

export default Noticeboard;