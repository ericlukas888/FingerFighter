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