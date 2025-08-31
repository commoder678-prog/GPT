import React, { useState } from "react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#" },
  { name: "Docs", href: "#" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Example user (could be replaced with real user data)
  const user = { name: "A", image: null };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/30 px-4 sm:px-6 py-4 flex items-center justify-between relative z-20 shadow-lg">
      {/* Left: Brand/Logo */}
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent select-none tracking-tight">
            NEBULA AI
          </span>
        </div>
        </span>
      </div>

      {/* Center: Nav Links (hidden on mobile) */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-300 hover:text-white transition-all duration-200 font-medium relative group px-3 py-2 rounded-lg hover:bg-slate-800/50"
          >
            {link.name}
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </a>
        ))}
      </div>

      {/* Right: User Avatar & Hamburger */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* User avatar button */}
        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-2 border-slate-600/50 hover:border-indigo-400/50 transition-all duration-200 shadow-lg hover:shadow-indigo-500/25">
          {user.image ? (
            <img
              src={user.image}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-white font-bold text-sm">
              {user.name[0]}
            </span>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900/98 backdrop-blur-xl border-b border-slate-700/30 shadow-2xl md:hidden animate-fade-in z-30">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-6 py-3 text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
