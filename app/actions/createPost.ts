"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/app/lib/auth";

export type CreatePostState = {
  error?: string;
  success?: boolean;
};

export async function createPost(
  prevstate: CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "You must be logged in to post" };
  }

  const content = formData.get("content") as string;

  if (!content?.trim()) {
    return { error: "Post content cannot be empty" };
  }

  await prisma.post.create({
    data: {
      content,
      authorId: user.id,
    },
  });

  revalidatePath("/feed");
  return { success: true };
}