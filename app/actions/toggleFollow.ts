"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleFollow(followingId: string) {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Not authenticated");
    if (currentUser.id === followingId) throw new Error("Cannot follow yourself");

    const existing = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: currentUser.id,
                followingId,
            },
        },
    });

    if (existing) {
        // Unfollow / cancel request
        await prisma.follow.delete({ where: { id: existing.id } });
    } else {
        // Send a friend request
        await prisma.follow.create({
            data: {
                followerId: currentUser.id,
                followingId,
                status: "PENDING",
            },
        });
    }

    revalidatePath("/feed");
    revalidatePath("/my-network");
}