"use client";

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

type CommentProps = {
    comment: CommentData;
};

export function Comment({
    comment,
}: CommentProps) {
    const authorName =
        comment.author.name ||
        comment.author.username;

    const initial = authorName
        .charAt(0)
        .toUpperCase();

    const formattedDate = new Intl.DateTimeFormat(
        "en",
        {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }
    ).format(new Date(comment.createdAt));

    return (
        <article className="flex gap-3 py-3 border-b border-gray-100 last:border-b-0">

            {/* Avatar */}
            <div className="flex-shrink-0">
                {comment.author.profilePhoto ? (
                    <img
                        src={comment.author.profilePhoto}
                        alt={authorName}
                        className="w-9 h-9 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-indigo-600">
                            {initial}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">
                        {authorName}
                    </span>

                    <span className="text-xs text-gray-400">
                        @{comment.author.username}
                    </span>

                    <span className="text-xs text-gray-400">
                        · {formattedDate}
                    </span>
                </div>

                <p className="mt-1 text-sm text-gray-700 break-words">
                    {comment.content}
                </p>

            </div>
        </article>
    );
}