"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../lib/auth";

const getLikedPosts = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    const likedPosts = await prisma.post.findMany({
        where: {
            likes: {
                some: {
                    userId: currentUser.id,
                },
            },
        },

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

            // All likes
            likes: {
                select: {
                    id: true,
                    userId: true,
                },
            },

            // All saves
            saves: {
                select: {
                    id: true,
                    userId: true,
                },
            },

            _count: {
                select: {
                    likes: true,
                    saves: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    return likedPosts.map((post) => {
        const isLiked = post.likes.some(
            (like) => like.userId === currentUser.id
        );

        const isSaved = post.saves.some(
            (save) => save.userId === currentUser.id
        );

        const isFollowing = post.author.followers.some(
            (follower) =>
                follower.followerId === currentUser.id &&
                follower.status === "ACCEPTED"
        );

        const isFriend =
            post.author.followers.some(
                (follower) =>
                    follower.followerId === currentUser.id &&
                    follower.status === "ACCEPTED"
            ) &&
            post.author.following.some(
                (following) =>
                    following.followingId === currentUser.id &&
                    following.status === "ACCEPTED"
            );

        return {
            ...post,
            initialLiked: isLiked,
            initialSaved: isSaved,
            initialFollowing: isFollowing,
            isFriend,
        };
    });
};

export default getLikedPosts;