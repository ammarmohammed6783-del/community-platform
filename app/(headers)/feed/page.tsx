import CreatePost from "@/component/CreatePost";
import Post from "./component/Post";
import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth";
import Link from "next/link";

export default async function Feed() {
  const user = await getCurrentUser();

  const posts = user
    ? await prisma.post.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { likes: true, saves: true },
        },
        likes: { where: { userId: user.id }, select: { id: true } },
        saves: { where: { userId: user.id }, select: { id: true } },
      },
    })
    : [];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Feed Title Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600 dark:from-white dark:via-slate-200 dark:to-indigo-400 bg-clip-text text-transparent">
            Community Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore thoughts, ideas, and discussions from community members.
          </p>
        </div>
      </div>

      {/* Create Post Card */}
      <CreatePost />

      {/* Post List */}
      <div className="space-y-6">
        {!user ? (
          <div className="p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto text-2xl">
              🔒
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Please log in</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                You need to be signed in to view and interact with posts, so <Link href="/login" className="text-indigo-500 font-bold hover:underline cursor-pointer">log in</Link> to continue.
              </p>
            </div>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              initialLiked={post.likes.length > 0}
              initialSaved={post.saves.length > 0}
            />
          ))
        ) : (
          <div className="p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto text-2xl">
              💬
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No posts yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Be the first to start a conversation in the community! Click "Post" above to share your thoughts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}