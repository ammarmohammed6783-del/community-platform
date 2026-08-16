import { UserType } from "@/app/types/userType";

export default function UserCard({ person }: { person: UserType }) {

    return <div
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
            className="w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
        >
            Connect
        </button>
    </div>
}