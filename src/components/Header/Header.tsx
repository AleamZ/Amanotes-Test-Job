import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Badge, Space, Dropdown, Switch } from 'antd';
import {
    BellOutlined,
    UserOutlined,
    SettingOutlined,
    EditOutlined,
    BookOutlined,
    SaveOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import NotificationDropdown from './NotificationDropdown';
import SearchBox from '../SearchBox/SearchBox';
import type { HeaderProps } from '../../interface/Header.interface';
import type { Notification } from '../../interface/Notification.interface';

const { Header: AntHeader } = Layout;



const Header: React.FC<HeaderProps> = ({
    onSearchChange,
    searchTerm,
}) => {
    // State for notifications
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'like',
            title: 'Nguyễn Văn A đã thích bài viết của bạn',
            description: 'Bài viết: "Hướng dẫn học React từ cơ bản đến nâng cao"',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            time: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            isRead: false
        },
        {
            id: '2',
            type: 'comment',
            title: 'Trần Thị B đã bình luận bài viết của bạn',
            description: 'Bài viết rất hay! Cảm ơn bạn đã chia sẻ.',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            isRead: false
        },
        {
            id: '3',
            type: 'follow',
            title: 'Lê Văn C đã theo dõi bạn',
            description: 'Bây giờ họ có thể xem các bài viết mới của bạn.',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            isRead: false
        },
        {
            id: '4',
            type: 'system',
            title: 'Cập nhật hệ thống',
            description: 'Phiên bản mới đã được phát hành với nhiều tính năng thú vị.',
            time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            isRead: true
        },
        {
            id: '5',
            type: 'like',
            title: 'Hoàng Thị D và 5 người khác đã thích bài viết của bạn',
            description: 'Bài viết: "10 mẹo để code hiệu quả hơn"',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            isRead: true
        }
    ]);

    // Handle notification actions
    const handleMarkAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        );
    };

    // Get unread count
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
    }, [darkMode]);

    const avatarMenuItems = {
        items: [
            {
                key: 'user-info',
                label: (
                    <div className="user-info">
                        <div className="username">Đạt Nguyễn</div>
                        <div className="user-handle">@nguyendat233</div>
                    </div>
                ),
            },
            {
                key: 'profile',
                label: (
                    <div className="menu-item">
                        <UserOutlined />
                        <span>Trang cá nhân</span>
                    </div>
                ),
            },
            {
                key: 'write-blog',
                label: (
                    <div className="menu-item">
                        <EditOutlined />
                        <span>Viết blog</span>
                    </div>
                ),
            },
            {
                key: 'my-posts',
                label: (
                    <div className="menu-item">
                        <BookOutlined />
                        <span>Bài viết của tôi</span>
                    </div>
                ),
            },
            {
                key: 'saved-posts',
                label: (
                    <div className="menu-item">
                        <SaveOutlined />
                        <span>Bài viết đã lưu</span>
                    </div>
                ),
            },
            {
                key: 'settings',
                label: (
                    <div className="menu-item">
                        <SettingOutlined />
                        <span>Cài đặt</span>
                    </div>
                ),
            },
            {
                key: 'logout',
                label: (
                    <div className="menu-item danger">
                        <LogoutOutlined />
                        <span>Đăng xuất</span>
                    </div>
                ),
            },
        ],
    };

    const handleMenuClick = (key: string) => {
        switch (key) {
            case 'profile':
                // Handle profile click
                break;
            case 'write-blog':
                // Handle write blog click
                break;
            case 'my-posts':
                // Handle my posts click
                break;
            case 'saved-posts':
                // Handle saved posts click
                break;
            case 'settings':
                // Handle settings click
                break;
            case 'logout':
                // Handle logout click
                break;
            default:
                break;
        }
    };

    return (
        <AntHeader className="site-header" style={{ background: '#fff', padding: '0 24px' }}>
            <div className="header-content">
                {/* Search Bar */}
                <div className="search-container">
                    <SearchBox
                        value={searchTerm}
                        onChange={onSearchChange}
                        onSearch={onSearchChange}
                        placeholder="Tìm kiếm khóa học, giáo trình..."
                    />
                </div>

                {/* Right Actions */}
                <div className="right-actions">
                    <Space size={16}>
                        <Switch
                            checked={darkMode}
                            onChange={setDarkMode}
                            checkedChildren="🌙"
                            unCheckedChildren="☀️"
                            style={{ background: darkMode ? '#001529' : '#f0f0f0' }}
                        />
                        <Dropdown
                            dropdownRender={() => (
                                <NotificationDropdown
                                    notifications={notifications}
                                    onMarkAsRead={handleMarkAsRead}
                                    onMarkAllAsRead={handleMarkAllAsRead}
                                />
                            )}
                            trigger={['click']}
                            placement="bottomRight"
                            overlayClassName="notification-dropdown-overlay"
                        >
                            <div className="notification-icon-wrapper">
                                <Badge count={unreadCount} size="small">
                                    <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                                </Badge>
                            </div>
                        </Dropdown>
                        <Dropdown
                            menu={avatarMenuItems}
                            trigger={['click']}
                            placement="bottomRight"
                            overlayClassName="avatar-dropdown"
                        >
                            <div className="avatar-wrapper">
                                <Avatar icon={<UserOutlined />} />
                            </div>
                        </Dropdown>
                    </Space>
                </div>
            </div>
        </AntHeader>
    );
};

export default Header; 