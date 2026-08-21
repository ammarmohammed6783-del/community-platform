"use client";

import { useChannel } from "ably/react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import { createComment } from "@/app/actions/createComment";

type CommentsFormProps = {
    postId: string;
};

export function CommentsForm({
    postId,
}: CommentsFormProps) {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { publish } = useChannel(
        `post-${postId}-comments`,
        () => {}
    );

    const handlePublish = async () => {
        if (!inputValue.trim() || isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const comment = await createComment(
                postId,
                inputValue
            );

            await publish(
                "comment-created",
                comment
            );

            setInputValue("");
        } catch (error) {
            console.error(
                "Failed to create comment:",
                error
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full flex gap-2">
            <input
                type="text"
                value={inputValue}
                placeholder="Write a comment..."
                onChange={(e) =>
                    setInputValue(e.target.value)
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handlePublish();
                    }
                }}
                disabled={isSubmitting}
                className="flex-1 px-3 py-2 border rounded-md outline-none"
            />

            <button
                onClick={handlePublish}
                disabled={
                    isSubmitting ||
                    !inputValue.trim()
                }
                className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
            >
                <AiOutlineSend />
            </button>
        </div>
    );
}