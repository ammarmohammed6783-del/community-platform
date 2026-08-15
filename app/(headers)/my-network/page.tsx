"use client";

import { useState } from "react";

export default function MyNetwork() {
  const [connections, setConnections] = useState([
    { id: 1, name: "Sarah Jenkins", title: "Senior Frontend Engineer", followers: "1.2k", initial: "SJ", color: "from-blue-600 to-indigo-600" },
    { id: 2, name: "Alex Rivera", title: "Product Designer @ Figma", followers: "980", initial: "AR", color: "from-purple-600 to-pink-600" },
    { id: 3, name: "David Chen", title: "Fullstack Developer & Creator", followers: "3.4k", initial: "DC", color: "from-emerald-600 to-teal-600" },
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight bg-gradient-to-r from-slate-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
              My Network
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Manage your connections, invitations, and discover like-minded peers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
              150 Connections
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">150</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Connections</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">250</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Followers</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">12</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Pending</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-white">4</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">Invitations</span>
          </div>
        </div>
      </div>

      {/* Recommended Connections Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Suggested for you
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {connections.map((person) => (
            <div
              key={person.id}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-5 flex flex-col items-center text-center space-y-3 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${person.color} text-white font-extrabold text-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                {person.initial}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {person.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {person.title}
                </p>
                <span className="text-[11px] text-indigo-500 font-semibold mt-1 block">
                  {person.followers} followers
                </span>
              </div>

              <button
                onClick={() => setConnections(connections.filter((c) => c.id !== person.id))}
                className="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
