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
    <nav className="bg-slate-900/90 border-b border-slate-700/50 px-4 sm:px-6 py-3 flex items-center justify-between relative z-20">
      {/* Left: Brand/Logo */}
      <div className="flex items-center">
        <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent select-none">
          CHAT A.I+
        </span>
      </div>

      {/* Center: Nav Links (hidden on mobile) */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-300 hover:text-white transition font-medium"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Right: User Avatar & Hamburger */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
        <button className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
          {user.image ? (
            <img
              src={user.image}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-indigo-300 font-bold text-lg">
              {user.name[0]}
            </span>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900/95 border-b border-slate-700/50 shadow-lg md:hidden animate-fade-in z-30">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-6 py-3 text-gray-300 hover:text-white transition font-medium"
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
