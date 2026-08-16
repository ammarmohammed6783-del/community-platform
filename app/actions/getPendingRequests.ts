"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../lib/auth";

export async function getPendingRequests() {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    return prisma.follow.findMany({
        where: {
            followingId: currentUser.id,
            status: "PENDING",
        },
        include: {
            follower: { select: { id: true, name: true, username: true } },
        },
    });
}