"use client";

import { ChannelProvider } from "ably/react";

export function CommentsChannelProvider({
    postId,
    children,
}: {
    postId: string;
    children: React.ReactNode;
}) {
    return (
        <ChannelProvider channelName={`post-${postId}-comments`}>
            {children}
        </ChannelProvider>
    );
}