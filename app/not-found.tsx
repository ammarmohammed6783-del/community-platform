import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">404 - Page Not Found</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">The page you are looking for does not exist or has been moved.</p>
            <Link href="/" className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md">
                Go to home page
            </Link>
        </div>
    );
}