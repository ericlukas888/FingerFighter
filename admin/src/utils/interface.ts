export interface UserItemProps {
    id: number;
    telegramId: number;
    first_name: string;
    last_name: string;
    user_name: string;
    status: boolean;
    walletAddress?: string;
    country?: string;
}

export interface RankingItemProps {
    id: number;
    maxScore: number;
    started_date: string;
    updatedAt: string;
    User: {
        id: number;
        telegramId: number;
        first_name: string;
        last_name: string;
        user_name: string;
        country: string;
    }
}

export interface GameItemProps {
    id: number;
    name: string;
    description: string;
    image: ImageBitmap;
    status: boolean;
}

export interface RewardItemProps {
    id: number,
    title: string;
    amount: number;
    createdAt: string;
    User: {
        first_name: string;
        last_name: string;
        user_name: string;
        walletAddress: string;
        country: string;
    }
}