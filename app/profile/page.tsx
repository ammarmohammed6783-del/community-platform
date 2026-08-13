export default function Profile() {
    return (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-slate-950 border border-slate-800/80 h-32 w-32 mx-auto p-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">AM</h1>
            </div>

            <p>username</p>
            <p>bio</p>
            <p>followers</p>
            <p>following</p>

            <div>
                saved posts
            </div>


            <div>
                liked posts
            </div>
        </div>
    );
}
