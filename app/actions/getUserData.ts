"use server"

import { getCurrentUser } from "../lib/auth";
import { prisma } from "@/app/lib/prisma"; // adjust to your actual prisma client path

export default async function getUserData() {
    const authUser = await getCurrentUser();
    if (!authUser) return null;

    return await prisma.user.findUnique({
        where: { id: authUser.id },
        select: {
            id: true,
            email: true,
            username: true,
            name: true,
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true,
                },
            },
        },
    });
}