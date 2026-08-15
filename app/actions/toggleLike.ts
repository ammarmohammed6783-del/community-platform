"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/app/lib/auth";

export async function toggleLike(postId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to like a post" };
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: { userId: user.id, postId },
    },
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
  } else {
    await prisma.like.create({ data: { userId: user.id, postId } });
  }

  revalidatePath("/feed");
}