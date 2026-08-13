import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              let's talk
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex items-center space-x-2 border border-slate-300 dark:border-slate-700/80 bg-slate-100/80 dark:bg-slate-900/80 hover:border-indigo-500/60 transition-all duration-300 rounded-lg shadow-sm">
            <input type="text" placeholder="search" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none" />
            <button className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/feed"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              Feed
            </Link>

            <Link
              href="/my-network"
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              my network
            </Link>
          </nav>

          {/* Profile Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 hover:border-indigo-500/60 hover:bg-slate-200 dark:hover:bg-slate-800/90 text-slate-800 dark:text-slate-200 transition-all duration-300 group shadow-sm"
            >
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-semibold text-xs border border-indigo-500/30">
                <span className="relative z-10">MP</span>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-100 dark:ring-slate-900" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white hidden sm:inline">
                my profile
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


