"use server";

import { prisma } from "@/lib/prisma";

type UpdateProfileData = {
    name?: string;
    username?: string;
    description?: string;
};

export async function updateProfileTexts(
    userId: string,
    data: UpdateProfileData
) {
    const updateData: UpdateProfileData = {};

    if (data.name && data.name.trim().length > 2) {
        updateData.name = data.name.trim();
    }

    if (data.username && data.username.trim().length > 2) {
        updateData.username = data.username.trim();
    }

    if (data.description && data.description.trim().length > 2) {
        updateData.description = data.description.trim();
    }

    if (Object.keys(updateData).length === 0) {
        throw new Error("No valid profile fields to update");
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: updateData,
        select: {
            name: true,
            username: true,
            description: true,
        },
    });

    return updatedUser;
}