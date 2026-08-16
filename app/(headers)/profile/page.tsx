"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreatePost from "@/component/CreatePost";

export default function Profile() {
    const router = useRouter();
    const [theme, setTheme] = useState(false);
    const [status, setStatus] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(!isDark);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        if (newTheme) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    };

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await fetch("/api/logout", { method: "POST" });
        } catch (e) {
            console.error("Logout failed:", e);
        }
        setLoggingOut(false);
        router.push("/login");
        router.refresh();
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 transition-colors duration-300">
                {/* Profile Header Section */}
                <div className="space-y-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="relative shrink-0">
                                <div className="rounded-full w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white font-bold text-2xl shadow-lg shadow-indigo-500/25 ring-4 ring-slate-200 dark:ring-slate-800/80 transition-transform duration-300 hover:scale-105">
                                    AM
                                </div>
                                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent truncate">
                                    Ammar Mohammed
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">@ammar_mohammed</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 shrink-0 flex-wrap">
                            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 cursor-pointer">
                                Edit profile
                            </button>
                            <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 transition-all duration-200 cursor-pointer">
                                Share
                            </button>



                            <button
                                onClick={toggleTheme}
                                title={theme ? "Switch to Dark Mode" : "Switch to Light Mode"}
                                className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 transition-all duration-200 cursor-pointer text-lg flex items-center justify-center"
                            >
                                {theme ? "☀️" : "🌑"}
                            </button>
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
                        Full stack developer building modern community platforms. Let's talk about Next.js web architecture and UI design!
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                            <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">following</span>
                            <span className="font-bold text-slate-900 dark:text-white">150</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                            <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">followers</span>
                            <span className="font-bold text-slate-900 dark:text-white">250</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                            <span className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">posts</span>
                            <span className="font-bold text-slate-900 dark:text-white">120</span>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="flex items-center gap-6 pt-6 border-b border-slate-200 dark:border-slate-800/80 mb-6">
                    <button
                        onClick={() => setStatus(true)}
                        className={`pb-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${status
                                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                    >
                        Saved posts
                        {status && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500/50" />
                        )}
                    </button>
                    <button
                        onClick={() => setStatus(false)}
                        className={`pb-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${!status
                                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                            }`}
                    >
                        Liked posts
                        {!status && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500/50" />
                        )}
                    </button>
                    <button
                        className={`pb-3 text-sm font-medium transition-all duration-200 relative cursor-pointer`}
                    >
                        friend request
                    </button>
                </div>

                {/* Tab Content */}
                {status ? (
                    <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-center font-medium shadow-inner">
                        No saved posts yet.
                    </div>
                ) : (
                    <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-center font-medium shadow-inner">
                        No liked posts yet.
                    </div>
                )}

                {/* Account & Session Management Section */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Account Session</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Sign out of your account on this device</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 shadow-md shadow-rose-600/30 transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>{loggingOut ? "Signing out..." : "Log out"}</span>
                    </button>
                </div>
            </div>

            {/* Header Banner */}
            <div className="mt-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight bg-gradient-to-r from-slate-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                            My Analytics
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Track your profile views, post engagement, and connection growth.
                        </p>
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

            {/* Create Post Section */}
            <div className="mt-8">
                <CreatePost />
            </div>
        </div>
    );
}
