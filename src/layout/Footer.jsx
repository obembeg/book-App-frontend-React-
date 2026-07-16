import React from "react";
import {
  IoBook,
  IoLogoGithub,
  IoLogoTwitter,
  IoLogoLinkedin,
} from "react-icons/io5";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-xl tracking-tight">
              <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20">
                <IoBook className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-indigo-200 to-white bg-clip-text text-transparent">
                Book App
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your premium reading companion. Organize, track, and
              accomplish your reading goals with our clean, modern books
              dashboard.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900/50 hover:bg-slate-900 hover:text-indigo-400 transition duration-200"
              >
                <IoLogoTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900/50 hover:bg-slate-900 hover:text-indigo-400 transition duration-200"
              >
                <IoLogoGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900/50 hover:bg-slate-900 hover:text-indigo-400 transition duration-200"
              >
                <IoLogoLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-200"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition duration-200"
                >
                  Support Helpdesk
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Stay updated
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Get notifications on new updates and feature releases.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 placeholder:text-slate-500 w-full transition duration-200"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition duration-200 cursor-pointer active:scale-95 whitespace-nowrap shadow-lg shadow-indigo-600/10"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} OG. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
