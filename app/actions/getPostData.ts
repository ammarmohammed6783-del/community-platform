import { prisma } from "../lib/prisma";

const getPostData = async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      _count: {
        select: { likes: true, saves: true },
      },
    },
  });
};

export default getPostData;