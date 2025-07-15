import React from 'react';
import { List, Avatar, Badge, Button, Empty } from 'antd';
import {
    UserOutlined,
    HeartOutlined,
    MessageOutlined,
    StarOutlined,
    CheckOutlined
} from '@ant-design/icons';
import type { Notification } from '../../interface/Notification.interface';

interface NotificationDropdownProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onMarkAllAsRead: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
    notifications,
    onMarkAsRead,
    onMarkAllAsRead
}) => {
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'like':
                return <HeartOutlined style={{ color: '#ff4d4f' }} />;
            case 'comment':
                return <MessageOutlined style={{ color: '#1890ff' }} />;
            case 'follow':
                return <UserOutlined style={{ color: '#52c41a' }} />;
            case 'system':
                return <StarOutlined style={{ color: '#faad14' }} />;
            default:
                return <UserOutlined />;
        }
    };

    const formatTime = (time: string) => {
        const now = new Date();
        const notificationTime = new Date(time);
        const diffMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));

        if (diffMinutes < 60) {
            return `${diffMinutes} phút trước`;
        } else if (diffMinutes < 1440) {
            return `${Math.floor(diffMinutes / 60)} giờ trước`;
        } else {
            return `${Math.floor(diffMinutes / 1440)} ngày trước`;
        }
    };

    return (
        <div className="notification-dropdown">
            <div className="notification-header">
                <h4>Thông báo</h4>
                {notifications.length > 0 && (
                    <Button
                        type="link"
                        size="small"
                        onClick={onMarkAllAsRead}
                        className="mark-all-read"
                    >
                        Đánh dấu tất cả đã đọc
                    </Button>
                )}
            </div>

            <div className="notification-list">
                {notifications.length === 0 ? (
                    <Empty
                        description="Không có thông báo nào"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{ padding: '20px 0' }}
                    />
                ) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={notifications}
                        renderItem={(item) => (
                            <List.Item
                                className={`notification-item ${!item.isRead ? 'unread' : ''}`}
                                onClick={() => onMarkAsRead(item.id)}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <div className="notification-avatar">
                                            <Avatar
                                                src={item.avatar}
                                                icon={!item.avatar ? <UserOutlined /> : undefined}
                                                size={40}
                                            />
                                            <div className="notification-type-icon">
                                                {getNotificationIcon(item.type)}
                                            </div>
                                        </div>
                                    }
                                    title={
                                        <div className="notification-content">
                                            <span className="notification-title">{item.title}</span>
                                            {!item.isRead && <Badge status="processing" />}
                                        </div>
                                    }
                                    description={
                                        <div className="notification-details">
                                            <p className="notification-description">{item.description}</p>
                                            <span className="notification-time">{formatTime(item.time)}</span>
                                        </div>
                                    }
                                />
                                {!item.isRead && (
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<CheckOutlined />}
                                        className="mark-read-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onMarkAsRead(item.id);
                                        }}
                                    />
                                )}
                            </List.Item>
                        )}
                    />
                )}
            </div>

            {notifications.length > 0 && (
                <div className="notification-footer">
                    <Button type="link" block>
                        Xem tất cả thông báo
                    </Button>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown; 