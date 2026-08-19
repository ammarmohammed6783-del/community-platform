"use client"

import { toggleFollow } from "@/app/actions/toggleFollow";
import { UserType } from "@/app/types/userType";
import { startTransition, useState } from "react";

export default function UserCard({ person, isFollowing }: { person: UserType, isFollowing: boolean }) {
    const [following, setFollowing] = useState<boolean>(isFollowing);

    const followHim = () => {
        setFollowing((prev) => !prev);
        startTransition(async () => {
            await toggleFollow(person.id);
        });
    };

    return <div
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-5 flex flex-col items-center text-center space-y-3 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
        {
            person.profilePhoto ? (
                <img
                    src={person.profilePhoto}
                    alt={person.name ?? ""}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform"
                />
            ) : (
                <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-tr ${person.color} text-white font-extrabold text-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                >
                    <div>{person.initial}</div>
                </div>
            )
        }
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
            className={`w-full py-2 px-4 rounded-xl text-xs font-bold text-white ${following ? "bg-gray-400" : "bg-indigo-600"} hover:${following ? "bg-gray-500" : "bg-indigo-500"} active:scale-95 transition-all shadow-md ${following ? "shadow-slate-600/20" : "shadow-indigo-600/20"} cursor-pointer`}
            onClick={followHim}
        >
            {following ? "Unfollow" : "Follow +"}
        </button>
    </div>
}