// app/actions/createPost.ts
"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export type CreatePostState = {
  error?: string;
  success?: boolean;
};

export async function createPost(
  prevstate:CreatePostState,
  formData: FormData
): Promise<CreatePostState> {
  const content = formData.get("content") as string;

  if (!content?.trim()) {
    return { error: "Post content cannot be empty" };
  }

  await prisma.post.create({
    data: {
      content,
      authorId: "wait until validation",
    },
  });

  revalidatePath("/feed");
  return { success: true };
}