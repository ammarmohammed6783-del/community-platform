import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../../lib/auth";
import UserCard from "./component/UserCard";
import { UserType } from "@/app/types/userType";

const colors = [
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-pink-500",
  "from-blue-500 to-cyan-500",
];

export default async function MyNetwork({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const currentUser = await getCurrentUser();

  const { q } = await searchParams;

  const users = await prisma.user.findMany({
    where: {
      id: { not: currentUser?.id },
      ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    },
    select: {
      id: true,
      name: true,
      username: true,
      _count: {
        select: { followers: true },
      },
      followers: {
        where: { followerId: currentUser?.id },
        select: { status: true },
      },
    },
  });

  const people: UserType[] = users.map((user, i) => {
    const followRecord = user.followers[0];

    return {
      id: user.id,
      name: user.name ?? user.username,
      title: "Member",
      followers: user._count.followers,
      initial: (user.name ?? user.username).charAt(0).toUpperCase(),
      color: colors[i % colors.length],
      isFollowing: !!followRecord && (followRecord.status === "PENDING" || followRecord.status === "ACCEPTED"),
      isPending: followRecord?.status === "PENDING",
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Suggested for you
        </h2>

        {
          people.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {people.map((person) => (
                <UserCard key={person.id} person={person} isFollowing={person.isFollowing} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                No suggestions right now
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Looks like you're all connected! Come back later for more suggestions.
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
}