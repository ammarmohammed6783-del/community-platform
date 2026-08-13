"use client";

import { useState } from "react";

export default function CreatePost() {

    const [visible, setVisible] = useState(false);
    const toggleIt = () => {
        setVisible(!visible);
    }

    return (
        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 my-10 mx-auto shadow-md dark:shadow-none transition-colors duration-300">

            <button
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-medium transition-all duration-200 cursor-pointer shadow-sm"
                onClick={toggleIt}
            >
                Start a post
            </button>

            {visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm p-4">

                    <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-2xl transition-colors duration-300">

                        <button
                            className="absolute top-3 right-3 flex justify-center items-center rounded-full w-8 h-8 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer"
                            onClick={toggleIt}
                        >
                            ✕
                        </button>

                        <form className="flex flex-col items-center justify-center gap-4 w-full mt-2" onSubmit={(e) => { e.preventDefault(); toggleIt(); }}>
                            <textarea
                                placeholder="What do you want to talk about?"
                                className="rounded-xl w-full min-h-[140px] border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm leading-relaxed"
                            />

                            <button
                                type="submit"
                                className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all duration-200 self-end"
                            >
                                Post
                            </button>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}