import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 mt-auto overflow-hidden transition-colors duration-300">
      {/* Top accent glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-md shadow-indigo-500/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                Let's talk
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Connecting passionate people, fostering collaboration, and building a stronger developer ecosystem.
            </p>
            <div className="pt-2">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-indigo-500/50 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>my profile</span>
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Community
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/discussions" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Discussions
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Events & Meetups
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Stay Connected
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Subscribe to get the latest community announcements and updates.
            </p>
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors duration-200 flex-shrink-0 cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} let's talk. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

