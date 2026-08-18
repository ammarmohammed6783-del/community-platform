"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth";

export default async function getUserData() {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return null;
    }

    return await prisma.user.findUnique({
        where: {
            id: currentUser.id,
        },
        select: {
            id: true,
            email: true,
            username: true,
            name: true,
            description: true,
            profilePhoto: true,
            _count: {
                select: {
                    posts: true,
                    following: true,
                    followers: true,
                },
            },
        },
    });
}