"use client"

import { useChannel } from "ably/react";
import { useEffect, useState } from "react";

import { Comment } from "./Comment";
import { getComments } from "@/app/actions/getComments";

type CommentsProps = {
    postId: string;
};

type CommentData = {
    id: string;
    content: string;
    createdAt: Date;
    author: {
        id: string;
        username: string;
        name: string | null;
        profilePhoto: string | null;
    };
};

export function CommentsList({ postId }: CommentsProps) {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Get existing comments from database
    useEffect(() => {
        async function fetchComments() {
            try {
                const data = await getComments(postId);

                setComments(data);
            } catch (error) {
                console.error(
                    "Failed to fetch comments:",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        }

        fetchComments();
    }, [postId]);

    // Listen for new comments from Ably
    useChannel(`post-${postId}-comments`, (message) => {
        const newComment = message.data as CommentData;

        setComments((currentComments) => {
            // Prevent duplicates
            if (
                currentComments.some(
                    (comment) =>
                        comment.id === newComment.id
                )
            ) {
                return currentComments;
            }

            return [...currentComments, newComment];
        });
    });

    return (
        <div className="w-full h-[calc(100vh-6rem)] max-w-2xl m-auto px-4 sm:px-6 lg:px-8 py-8 rounded-md border flex flex-col justify-between gap-4">

            <div className="border rounded-md p-3 w-full h-[250px] overflow-y-auto bg-white">

                {isLoading ? (
                    <p className="text-gray-500">
                        Loading comments...
                    </p>
                ) : comments.length === 0 ? (
                    <p className="text-gray-500">
                        No comments yet.
                    </p>
                ) : (
                    comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                        />
                    ))
                )}

            </div>
        </div>
    );
}