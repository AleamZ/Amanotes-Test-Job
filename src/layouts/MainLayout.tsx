import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    HomeOutlined,
    CompassOutlined,
    FileTextOutlined,
    BellOutlined,
    FilterOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Drawer, Checkbox } from 'antd';
import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import FilterBar from '../components/FilterBar/FilterBar';
import ChatBox from '../components/ChatBox/ChatBox';
import { useFilter } from '../context/FilterContext';
import './MainLayout.scss';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Trang Chủ', 'home', <HomeOutlined />),
    getItem('Lộ Trình', 'roadmap', <CompassOutlined />),
    getItem('Bài Viết', 'posts', <FileTextOutlined />),
    getItem('Thông Báo', 'notifications', <BellOutlined />),
    getItem('Bộ Lọc', 'filter', <FilterOutlined />),
];

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const { searchTerm, onSearchChange } = useFilter();
    const [collapsed, setCollapsed] = useState(false);
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);



    const handleMenuClick: MenuProps['onClick'] = (info) => {
        if (info.key === 'filter') {
            setFilterDrawerOpen(true);
        } else {
            navigate(`/${info.key}`);
        }
    };



    return (
        <Layout className="main-layout">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="sider-content">
                    <Logo collapsed={collapsed} />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['home']}
                        mode="inline"
                        items={items}
                        onClick={handleMenuClick}
                    />
                </div>
            </Sider>
            <Layout className={`main-content ${collapsed ? 'collapsed' : ''}`}>
                <Header
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                />
                <Content>
                    <div>
                        <Outlet />
                    </div>
                </Content>
                <Footer>
                    EduMarket AI ©{new Date().getFullYear()} Created by Amanotes (Nguyen Tienn Dat)
                </Footer>

                {/* Filter Drawer */}
                <Drawer
                    title="Bộ Lọc"
                    placement="right"
                    onClose={() => setFilterDrawerOpen(false)}
                    open={filterDrawerOpen}
                    width={320}
                >
                    <FilterBar
                        isOpen={filterDrawerOpen}
                        onClose={() => setFilterDrawerOpen(false)}
                    />
                </Drawer>
            </Layout>

            {/* Chat Box */}
            <ChatBox />
        </Layout>
    );
};

export default MainLayout; 