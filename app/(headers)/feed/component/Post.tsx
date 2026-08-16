"use client";

import { useState, useTransition } from "react";
import { toggleLike } from "@/app/actions/toggleLike";
import { toggleSave } from "@/app/actions/toggleSave";

interface PostProps {
  post: {
    id: string;
    content: string;
    createdAt: Date;
    authorId: string;
    author: {
      name: string | null;
    };
    _count: {
      likes: number;
      saves: number;
    };
    likes: { id: string }[];
    saves: { id: string }[];
  };
  initialLiked: boolean;
  initialSaved: boolean;
}

export default function Post({
  post,
  initialLiked,
  initialSaved,
}: PostProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(post._count.likes);
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  const handleToggleLike = () => {
    // optimistic UI update
    setLiked((prev) => !prev);
    setLikeCount((count) => (liked ? count - 1 : count + 1));

    startTransition(async () => {
      await toggleLike(post.id.toString());
    });
  };

  const handleToggleSave = () => {
    // optimistic UI update
    setSaved((prev) => !prev);

    startTransition(async () => {
      await toggleSave(post.id.toString());
    });
  };

  return (
    <article className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md dark:shadow-2xl dark:shadow-indigo-950/10 transition-all duration-300 space-y-4">
      {/* Post Author Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-indigo-500/20">
              MP
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                {post.author.name || "Unknown Author"}
              </h3>
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                : ""}
            </p>
          </div>
        </div>

        <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Post Content Body */}
      <div className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-normal">
        {post.content}
      </div>

      {/* Post Action Footer Bar */}
      <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleLike}
            disabled={isPending}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${liked
              ? "text-rose-500 bg-rose-500/10 font-semibold"
              : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
          >
            <svg className="w-4 h-4" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{likeCount} Likes</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-all cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comment</span>
          </button>
        </div>

        <button
          onClick={handleToggleSave}
          className={`p-1.5 rounded-xl transition-all cursor-pointer ${saved
            ? "text-indigo-500 bg-indigo-500/10"
            : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          title={saved ? "Unsave Post" : "Save Post"}
        >
          <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </article>
  );
}