import React from 'react';
import { Typography } from 'antd';

interface LogoProps {
    collapsed?: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
    return (
        <div className="logo-container">
            {collapsed ? (
                <Typography.Title level={3} style={{ margin: 0, color: '#fff' }}>
                    E
                </Typography.Title>
            ) : (
                <Typography.Title level={3} style={{ margin: 0, color: '#fff' }}>
                    EduMarket AI
                </Typography.Title>
            )}
        </div>
    );
};

export default Logo; 