// app/actions/toggleLike.ts
"use server";

import { prisma } from "@/app/lib/prisma";
import { getCurrentUser } from "@/app/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: postId,
      },
    },
  });

  if (existingLike) {
    // already liked -> remove it (unlike)
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    // not liked yet -> create it (like)
    await prisma.like.create({
      data: {
        userId: user.id,
        postId: postId,
      },
    });
  }

  revalidatePath("/feed"); // or wherever your feed route is
}