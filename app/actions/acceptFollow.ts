"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../lib/auth";
import { revalidatePath } from "next/cache";

export async function acceptFollow(followerId: string) {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Not authenticated");

    // Accept the incoming request
    await prisma.follow.update({
        where: {
            followerId_followingId: {
                followerId,
                followingId: currentUser.id,
            },
        },
        data: { status: "ACCEPTED" },
    });

    // Auto-create the reverse follow so it's mutual, i.e. "friends"
    await prisma.follow.upsert({
        where: {
            followerId_followingId: {
                followerId: currentUser.id,
                followingId: followerId,
            },
        },
        update: { status: "ACCEPTED" },
        create: {
            followerId: currentUser.id,
            followingId: followerId,
            status: "ACCEPTED",
        },
    });

    revalidatePath("/");
}