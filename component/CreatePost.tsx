"use client";

import { useActionState, useState, useEffect } from "react";
import { createPost, CreatePostState } from "@/app/actions/createPost";

const initialState: CreatePostState = {};

export default function CreatePost() {
  const [visible, setVisible] = useState(false);
  const [textLength, setTextLength] = useState(0);
  const toggleIt = () => setVisible(!visible);

  const [state, formAction, isPending] = useActionState(createPost, initialState);

  useEffect(() => {
    if (state.success) {
      setVisible(false);
      setTextLength(0);
    }
  }, [state.success]);

  return (
    <div className="w-full my-6">
      {/* Trigger Card */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md dark:shadow-2xl dark:shadow-indigo-950/20 transition-all duration-300 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
          MP
        </div>
        <button
          className="flex-1 text-left px-4 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-950/60 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer"
          onClick={toggleIt}
        >
          What do you want to talk about?
        </button>
        <button
          onClick={toggleIt}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/25 transition-all duration-200 cursor-pointer shrink-0"
        >
          Post
        </button>
      </div>

      {/* Post Creation Modal */}
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl transition-all duration-300 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                  MP
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    Create Post
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Share your thoughts with the community
                  </p>
                </div>
              </div>

              <button
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 font-bold transition-colors cursor-pointer flex items-center justify-center text-sm"
                onClick={toggleIt}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form action={formAction} className="space-y-4">
              <textarea
                name="content"
                placeholder="What do you want to talk about? Share code snippets, tech insights, or project updates..."
                required
                onChange={(e) => setTextLength(e.target.value.length)}
                className="w-full min-h-[160px] rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
              />

              {state.error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{state.error}</span>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80">
                <span className="text-xs text-slate-400">
                  {textLength} characters
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleIt}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 shadow-lg shadow-indigo-500/25 transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <span>Publish Post</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}