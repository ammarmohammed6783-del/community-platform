"use server";

import { prisma } from "@/app/lib/prisma";

export async function getComments(postId: string) {
    if (!postId) {
        throw new Error("Post ID is required");
    }

    return prisma.comment.findMany({
        where: {
            postId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    username: true,
                    name: true,
                    profilePhoto: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}