// app/(headers)/feed/page.tsx
// adjust the path above to match wherever your Feed page actually lives

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../../lib/auth"; // adjust path: app/lib/auth.ts or lib/auth.ts
import Post from "./component/Post"; // adjust path to match your actual folder structure

export default async function FeedPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  const currentUser = await getCurrentUser();

  const posts = await prisma.post.findMany({
    where: q ? {
      OR: [
        { content: { contains: q, mode: "insensitive" } },
        { author: { name: { contains: q, mode: "insensitive" } } },
      ],
    } : undefined,
    include: {
      author: {
        select: {
          name: true,
          followers: {
            select: {
              followerId: true,
              status: true,
            },
          },
          following: {
            select: {
              followingId: true,
              status: true,
            },
          },
        },
      },
      likes: true,
      saves: true,
      _count: {
        select: { likes: true, saves: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {posts.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-12">
          No posts yet. Be the first to share something!
        </p>
      ) : (
        posts.map((post) => {
          const currentUserId = currentUser?.id;

          const isFollowingAuthor = post.author.followers.some(
            (f) => f.followerId === currentUserId && (f.status === "PENDING" || f.status === "ACCEPTED")
          );

          const authorFollowsBack = post.author.following.some(
            (f) => f.followingId === currentUserId && f.status === "ACCEPTED"
          );

          return (
            <Post
              key={post.id}
              post={post}
              initialLiked={post.likes.some((l) => l.userId === currentUserId)}
              initialSaved={post.saves.some((s) => s.userId === currentUserId)}
              initialFollowing={isFollowingAuthor}
              isFriend={!!currentUserId && isFollowingAuthor && authorFollowsBack}
              currentUserId={currentUserId}
            />
          );
        })
      )}
    </div>
  );
}