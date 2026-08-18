"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CreatePost from "@/component/CreatePost";
import { acceptFollow } from "@/app/actions/acceptFollow";
import { getPendingRequests } from "@/app/actions/getPendingRequests";
import getUserData from "@/app/actions/getUserData";
import getSavedPosts from "@/app/actions/getSavedPosts";
import getLikedPosts from "@/app/actions/getLikedPosts";

import Post from "../feed/component/Post";
import { CiSettings } from "react-icons/ci";

type PendingRequest = {
    id: string;
    followerId: string;
    follower: {
        id: string;
        name: string | null;
        username: string;
    };
};

type CurrentUser = {
    id: string;
    name: string | null;
    username: string;
    profilePhoto: string | null;
    description: string | null;
    email: string;
    _count: {
        followers: number;
        following: number;
        posts: number;
    };
};

type Tab = "saved" | "liked" | "requests";

export default function Profile() {
    const router = useRouter();

    // Theme
    const [theme, setTheme] = useState(false);

    // Active tab
    const [activeTab, setActiveTab] = useState<Tab>("saved");

    // User
    const [currentUser, setCurrentUser] =
        useState<CurrentUser | null>(null);

    const [userLoading, setUserLoading] = useState(true);

    // Requests
    const [pendingRequests, setPendingRequests] =
        useState<PendingRequest[]>([]);

    const [requestsLoading, setRequestsLoading] =
        useState(true);

    // Posts
    const [savedPosts, setSavedPosts] = useState<any[]>([]);
    const [likedPosts, setLikedPosts] = useState<any[]>([]);

    const [savedPostsLoading, setSavedPostsLoading] =
        useState(true);

    const [likedPostsLoading, setLikedPostsLoading] =
        useState(true);

    // Actions
    const [loggingOut, setLoggingOut] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Error
    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    /*
     * Get current theme
     */
    useEffect(() => {
        const isDark =
            document.documentElement.classList.contains("dark");

        setTheme(!isDark);
    }, []);

    /*
     * Get current user
     */
    useEffect(() => {
        const loadUser = async () => {
            try {
                setUserLoading(true);
                setErrorMessage(null);

                const user = await getUserData();

                if (!user) {
                    setErrorMessage("User not found");
                    return;
                }

                setCurrentUser(user);
            } catch (error) {
                console.error("Failed to load user:", error);
                setErrorMessage("Failed to load user data");
            } finally {
                setUserLoading(false);
            }
        };

        loadUser();
    }, []);

    /*
     * Get pending requests
     */
    useEffect(() => {
        const loadRequests = async () => {
            try {
                setRequestsLoading(true);

                const requests = await getPendingRequests();

                setPendingRequests(requests);
            } catch (error) {
                console.error(
                    "Failed to load pending requests:",
                    error
                );
            } finally {
                setRequestsLoading(false);
            }
        };

        loadRequests();
    }, []);

    /*
     * Get saved posts
     */
    useEffect(() => {
        const loadSavedPosts = async () => {
            try {
                setSavedPostsLoading(true);

                const posts = await getSavedPosts();

                setSavedPosts(posts);
            } catch (error) {
                console.error(
                    "Failed to load saved posts:",
                    error
                );
            } finally {
                setSavedPostsLoading(false);
            }
        };

        loadSavedPosts();
    }, []);

    /*
     * Get liked posts
     */
    useEffect(() => {
        const loadLikedPosts = async () => {
            try {
                setLikedPostsLoading(true);

                const posts = await getLikedPosts();

                setLikedPosts(posts);
            } catch (error) {
                console.error(
                    "Failed to load liked posts:",
                    error
                );
            } finally {
                setLikedPostsLoading(false);
            }
        };

        loadLikedPosts();
    }, []);

    /*
     * Toggle theme
     */
    const toggleTheme = () => {
        const newTheme = !theme;

        setTheme(newTheme);

        if (newTheme) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    };

    /*
     * Logout
     */
    const handleLogout = async () => {
        setLoggingOut(true);

        try {
            await fetch("/api/logout", {
                method: "POST",
            });

            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoggingOut(false);
        }
    };

    /*
     * Accept friend request
     */
    const handleAccept = (followerId: string) => {
        // Optimistic UI update
        setPendingRequests((previousRequests) =>
            previousRequests.filter(
                (request) => request.followerId !== followerId
            )
        );

        startTransition(async () => {
            try {
                await acceptFollow(followerId);
            } catch (error) {
                console.error(
                    "Failed to accept follow request:",
                    error
                );
            }
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* Error */}
            {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-sm text-rose-600 dark:text-rose-400">
                    {errorMessage}
                </div>
            )}

            {/* Profile Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 transition-colors duration-300">

                {/* Profile Header */}
                <div className="space-y-6 pb-4 border-b border-slate-200 dark:border-slate-800/80">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">

                        {/* User information */}
                        <div className="flex items-center gap-5">

                            <div className="relative shrink-0">

                                {userLoading ? (
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                                ) : currentUser?.profilePhoto ? (
                                    <img
                                        src={currentUser.profilePhoto}
                                        alt="Profile"
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-slate-200 dark:ring-slate-800/80 transition-transform duration-300 hover:scale-105"
                                    />
                                ) : (
                                    <div className="rounded-full w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-linear-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white font-bold text-2xl shadow-lg shadow-indigo-500/25 ring-4 ring-slate-200 dark:ring-slate-800/80 transition-transform duration-300 hover:scale-105">
                                        {currentUser?.name
                                            ?.slice(0, 1)
                                            .toUpperCase() || "U"}
                                    </div>
                                )}

                                {!userLoading && (
                                    <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
                                )}
                            </div>

                            <div className="min-w-0">

                                {userLoading ? (
                                    <>
                                        <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />

                                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse mt-2" />
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight bg-linear-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text truncate">
                                            {currentUser?.name}
                                        </h1>

                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            {currentUser?.username}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 shrink-0 flex-wrap mt-4 sm:mt-0">

                            <Link
                                href="/profile/editProfile"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 cursor-pointer"
                            >
                                <CiSettings className="size-5" />
                                Edit profile
                            </Link>

                            <button
                                type="button"
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 transition-all duration-200 cursor-pointer"
                            >
                                Share
                            </button>

                            <button
                                type="button"
                                onClick={toggleTheme}
                                title={
                                    theme
                                        ? "Switch to Dark Mode"
                                        : "Switch to Light Mode"
                                }
                                className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 transition-all duration-200 cursor-pointer text-lg flex items-center justify-center"
                            >
                                {theme ? "☀️" : "🌑"}
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">

                        {userLoading ? (
                            <div className="h-5 w-72 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
                        ) : currentUser?.description ? (
                            <p>{currentUser.description}</p>
                        ) : (
                            <p>you can add your own description</p>
                        )}

                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-6 pt-6 border-b border-slate-200 dark:border-slate-800/80 mb-6">

                    {/* Saved */}
                    <button
                        type="button"
                        onClick={() => setActiveTab("saved")}
                        className={`pb-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${
                            activeTab === "saved"
                                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        }`}
                    >
                        Saved posts

                        {activeTab === "saved" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500/50" />
                        )}
                    </button>

                    {/* Liked */}
                    <button
                        type="button"
                        onClick={() => setActiveTab("liked")}
                        className={`pb-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${
                            activeTab === "liked"
                                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        }`}
                    >
                        Liked posts

                        {activeTab === "liked" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500/50" />
                        )}
                    </button>

                    {/* Requests */}
                    <button
                        type="button"
                        onClick={() => setActiveTab("requests")}
                        className={`pb-3 text-sm font-medium transition-all duration-200 relative cursor-pointer ${
                            activeTab === "requests"
                                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        }`}
                    >
                        Friend requests

                        {pendingRequests.length > 0 && (
                            <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                                {pendingRequests.length}
                            </span>
                        )}

                        {activeTab === "requests" && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full shadow-sm shadow-indigo-500/50" />
                        )}
                    </button>
                </div>

                {/* Saved Posts */}
                {activeTab === "saved" && (
                    savedPostsLoading ? (
                        <div className="p-8 text-center text-slate-500">
                            Loading saved posts...
                        </div>
                    ) : savedPosts.length > 0 ? (
                        savedPosts.map((savedPost) => (
                            <Post
                                key={savedPost.id}
                                post={savedPost}
                                initialLiked={savedPost.initialLiked}
                                initialSaved={savedPost.initialSaved}
                                initialFollowing={savedPost.initialFollowing}
                                isFriend={savedPost.isFriend}
                                currentUserId={currentUser?.id}
                            />
                        ))
                    ) : (
                        <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-center font-medium shadow-inner">
                            No saved posts yet.
                        </div>
                    )
                )}

                {/* Liked Posts */}
                {activeTab === "liked" && (
                    likedPostsLoading ? (
                        <div className="p-8 text-center text-slate-500">
                            Loading liked posts...
                        </div>
                    ) : likedPosts.length > 0 ? (
                        likedPosts.map((likedPost) => (
                            <Post
                                key={likedPost.id}
                                post={likedPost}
                                initialLiked={likedPost.initialLiked}
                                initialSaved={likedPost.initialSaved}
                                initialFollowing={likedPost.initialFollowing}
                                isFriend={likedPost.isFriend}
                                currentUserId={currentUser?.id}
                            />
                        ))
                    ) : (
                        <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-center font-medium shadow-inner">
                            No liked posts yet.
                        </div>
                    )
                )}

                {/* Friend Requests */}
                {activeTab === "requests" && (
                    <div className="space-y-3">

                        {requestsLoading ? (
                            <div className="p-8 text-center text-slate-500">
                                Loading friend requests...
                            </div>
                        ) : pendingRequests.length === 0 ? (
                            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 text-center font-medium shadow-inner">
                                No pending friend requests.
                            </div>
                        ) : (
                            pendingRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/60"
                                >
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {request.follower.name ||
                                            request.follower.username}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleAccept(
                                                request.followerId
                                            )
                                        }
                                        disabled={isPending}
                                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
                                    >
                                        {isPending
                                            ? "Accepting..."
                                            : "Accept"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Account & Session Management */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-rose-500/5">

                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            Account Session
                        </h4>

                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Sign out of your account on this device
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 shadow-md shadow-rose-600/30 transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 disabled:opacity-50"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>

                        <span>
                            {loggingOut
                                ? "Signing out..."
                                : "Log out"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Analytics */}
            <div className="mt-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight bg-linear-to-r from-slate-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text">
                            My Analytics
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Track your profile views, post engagement, and
                            connection growth.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">

                    {/* Connections */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
                        <span className="block text-lg font-bold text-slate-900 dark:text-white">
                            {currentUser?._count.following ?? 0}
                        </span>

                        <span className="text-[10px] uppercase font-bold text-slate-400">
                            Connections
                        </span>
                    </div>

                    {/* Followers */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
                        <span className="block text-lg font-bold text-slate-900 dark:text-white">
                            {currentUser?._count.followers ?? 0}
                        </span>

                        <span className="text-[10px] uppercase font-bold text-slate-400">
                            Followers
                        </span>
                    </div>

                    {/* Pending */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
                        <span className="block text-lg font-bold text-slate-900 dark:text-white">
                            {pendingRequests.length}
                        </span>

                        <span className="text-[10px] uppercase font-bold text-slate-400">
                            Pending
                        </span>
                    </div>

                    {/* Posts */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-center">
                        <span className="block text-lg font-bold text-slate-900 dark:text-white">
                            {currentUser?._count.posts ?? 0}
                        </span>

                        <span className="text-[10px] uppercase font-bold text-slate-400">
                            Posts
                        </span>
                    </div>

                </div>
            </div>

            {/* Create Post */}
            <div className="mt-8">
                <CreatePost />
            </div>
        </div>
    );
}