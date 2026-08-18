"use server"

import { prisma } from "@/lib/prisma";

export async function updateProfilePhoto(
    userId: string,
    profilePhoto: string
) {
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            profilePhoto,
        },
        select: {
            profilePhoto: true,
        },
    });
}