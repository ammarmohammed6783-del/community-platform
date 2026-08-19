export type UserType = {
    id: string;
    name: string;
    title: string;
    followers: number;
    profilePhoto: string | null;
    initial: string;
    color: string;
    isFollowing: boolean;
    isPending?: boolean;
};