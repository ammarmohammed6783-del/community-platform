import { CommentsChannelProvider } from "@/app/ably/ablyWrapper";
import { CommentsList } from "../components/CommentList"
import { CommentsForm } from "../components/CommentsForm";

type PageProps = {
    params: Promise<{
        postId: string;
    }>;
};

export default async function PostComments({ params }: PageProps) {

    const { postId } = await params;

    return (
        <div>
            <CommentsChannelProvider postId={postId}>
                <CommentsList postId={postId} />
                <CommentsForm postId={postId} />
            </CommentsChannelProvider>
        </div>
    );
}
