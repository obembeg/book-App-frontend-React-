import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { storeContext } from "../context/storeContext";
import { useContext } from "react";
import Deleted from "../pages/Deleted";
import Noticeboard from "../pages/Noticeboard";
import { 
  IoBook, 
  IoNotificationsOutline, 
  IoLogOutOutline, 
  IoPersonOutline, 
  IoGridOutline, 
  IoHomeOutline,
  IoMenu, 
  IoClose 
} from "react-icons/io5";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {
    isAuth,
    setLogOut,
    logOut,
    unreadCount,
    noticeBox,
    setNoticeBox,
  } = useContext(storeContext);
  const location = useLocation();

  if (logOut) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Deleted text="Log Out" />
      </div>
    );
  }
  if (noticeBox) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-xl bg-slate-950/60 grow flex items-center justify-center p-4">
        <Noticeboard />
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-white font-bold text-xl tracking-tight hover:opacity-90 transition duration-200"
            >
              <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/35">
                <IoBook className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
                OG Book App
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {!isAuth && (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                    isActive
                      ? "text-indigo-400 bg-indigo-950/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/50"
                  }`
                }
              >
                <IoHomeOutline className="w-4 h-4" />
                Home
              </NavLink>
            )}

            {isAuth && location.pathname !== "/profile" ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                      isActive
                        ? "text-indigo-400 bg-indigo-950/40"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/50"
                    }`
                  }
                >
                  <IoPersonOutline className="w-4 h-4" />
                  Profile
                </NavLink>

                {/* Notifications Trigger */}
                <button
                  onClick={() => setNoticeBox(true)}
                  className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition duration-200 cursor-pointer focus:outline-none"
                >
                  <IoNotificationsOutline className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-slate-950 animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            ) : isAuth && location.pathname === "/profile" ? (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                    isActive
                      ? "text-indigo-400 bg-indigo-950/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/50"
                  }`
                }
              >
                <IoGridOutline className="w-4 h-4" />
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                    isActive
                      ? "text-indigo-400 bg-indigo-950/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/50"
                  }`
                }
              >
                Login
              </NavLink>
            )}

            {isAuth ? (
              <button
                onClick={() => setLogOut(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition duration-200 cursor-pointer"
              >
                <IoLogOutOutline className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <NavLink
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition duration-200 shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                Get Started
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none transition duration-200 cursor-pointer"
            >
              {open ? <IoClose className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-slate-900 animate-fade-in-down">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {!isAuth && (
              <NavLink
                to="/"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium transition ${
                    isActive ? "bg-slate-900 text-indigo-400" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"
                  }`
                }
              >
                <IoHomeOutline className="w-5 h-5" />
                Home
              </NavLink>
            )}

            {isAuth && (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium transition ${
                      isActive ? "bg-slate-900 text-indigo-400" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"
                    }`
                  }
                >
                  <IoPersonOutline className="w-5 h-5" />
                  Profile
                </NavLink>

                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium transition ${
                      isActive ? "bg-slate-900 text-indigo-400" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"
                    }`
                  }
                >
                  <IoGridOutline className="w-5 h-5" />
                  Dashboard
                </NavLink>

                {/* Notifications trigger for mobile */}
                <button
                  onClick={() => {
                    setOpen(false);
                    setNoticeBox(true);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-slate-900/50 hover:text-white transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <IoNotificationsOutline className="w-5 h-5" />
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="bg-indigo-600 text-xs font-bold text-white px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </>
            )}

            {!isAuth ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium transition ${
                      isActive ? "bg-slate-900 text-indigo-400" : "text-slate-300 hover:bg-slate-900/50 hover:text-white"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/10"
                >
                  Get Started
                </NavLink>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  setLogOut(true);
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 rounded-xl text-base font-medium text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition cursor-pointer"
              >
                <IoLogOutOutline className="w-5 h-5" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
