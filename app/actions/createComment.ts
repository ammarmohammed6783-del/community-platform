"use server";

import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth";

export async function createComment(
    postId: string,
    content: string
) {
    if (!postId) {
        throw new Error("Post ID is required");
    }

    if (!content.trim()) {
        throw new Error(
            "Comment cannot be empty"
        );
    }

    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const comment = await prisma.comment.create({
        data: {
            content: content.trim(),
            postId,
            authorId: user.id,
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
    });

    return comment;
}