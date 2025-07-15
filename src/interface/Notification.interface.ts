export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'system';
    title: string;
    description: string;
    avatar?: string;
    time: string;
    isRead: boolean;
} 