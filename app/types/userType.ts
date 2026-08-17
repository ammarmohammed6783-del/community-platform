export type UserType = {
    id: string;
    name: string;
    title: string;
    followers: number;
    initial: string;
    color: string;
    isFollowing: boolean;
    isPending?: boolean;
};