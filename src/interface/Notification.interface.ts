export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'system';
    title: string;
    description: string;
    avatar?: string;
    time: string;
    isRead: boolean;
}
export interface NotificationDropdownProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
}