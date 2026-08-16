"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/app/lib/auth";

export async function toggleSave(postId: string) {
  if (!postId) {
    return { error: "Missing post id" };
  }

  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to save a post" };
  }

  try {
    const existingSave = await prisma.save.findUnique({
      where: {
        userId_postId: { userId: user.id, postId },
      },
    });

    if (existingSave) {
      await prisma.save.delete({ where: { id: existingSave.id } });
      revalidatePath("/feed");
      return { success: true, saved: false };
    }

    await prisma.save.create({ data: { userId: user.id, postId } });
    revalidatePath("/feed");
    return { success: true, saved: true };
  } catch (err: any) {
    // race: two rapid clicks both pass the findUnique check before either write lands
    if (err.code === "P2002") {
      return { success: true, saved: true };
    }
    // post got deleted between the click and the write
    if (err.code === "P2025") {
      return { error: "This post no longer exists" };
    }
    console.error("toggleSave failed:", err);
    return { error: "Something went wrong, please try again" };
  }
}