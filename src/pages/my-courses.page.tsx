import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Typography,
    Progress,
    Button,
    Tag,
    Space,
    Empty,
    Avatar,
    Divider
} from 'antd';
import {
    PlayCircleOutlined,
    ClockCircleOutlined,
    CalendarOutlined,
    BookOutlined,
    TrophyOutlined
} from '@ant-design/icons';
import { usePurchasedCourses } from '../context/PurchasedCoursesContext';

const { Title, Text } = Typography;

const MyCoursesPage: React.FC = () => {
    const navigate = useNavigate();
    const { purchasedCourses, updateLastAccessed } = usePurchasedCourses();
    const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return '#52c41a';
        if (progress >= 50) return '#faad14';
        return '#1890ff';
    };

    const getProgressStatus = (progress: number) => {
        if (progress === 100) return 'success';
        if (progress >= 50) return 'active';
        return 'normal';
    };

    const filteredCourses = purchasedCourses.filter(course => {
        switch (activeTab) {
            case 'in-progress':
                return course.progress > 0 && course.progress < 100;
            case 'completed':
                return course.progress === 100;
            default:
                return true;
        }
    });

    const handleContinueLearning = (courseId: string) => {
        updateLastAccessed(courseId);
        navigate(`/course/${courseId}`);
    };

    const renderCourseCard = (course: any) => (
        <Card
            key={course.id}
            hoverable
            style={{ marginBottom: '16px' }}
            bodyStyle={{ padding: '16px' }}
        >
            <Row gutter={16} align="middle">
                <Col xs={24} sm={6} md={4}>
                    <img
                        src={course.image}
                        alt={course.name}
                        style={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />
                </Col>
                <Col xs={24} sm={12} md={14}>
                    <div>
                        <Title level={4} style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                            {course.name}
                        </Title>

                        <Text type="secondary" style={{ marginBottom: '12px', display: 'block' }}>
                            {course.shortDescription}
                        </Text>

                        <Space style={{ marginBottom: '12px' }}>
                            <Tag color="blue" icon={<BookOutlined />}>
                                {course.category}
                            </Tag>
                            <Tag color="green" icon={<TrophyOutlined />}>
                                {course.level}
                            </Tag>
                        </Space>

                        <div style={{ marginBottom: '12px' }}>
                            <Text strong>Tiến độ học tập:</Text>
                            <Progress
                                percent={course.progress}
                                status={getProgressStatus(course.progress)}
                                strokeColor={getProgressColor(course.progress)}
                                size="small"
                                style={{ marginTop: '4px' }}
                            />
                        </div>

                        <Space split={<Divider type="vertical" />}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                <CalendarOutlined /> Mua ngày: {formatDate(course.purchaseDate)}
                            </Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                <ClockCircleOutlined /> Truy cập: {formatDate(course.lastAccessed)}
                            </Text>
                        </Space>
                    </div>
                </Col>
                <Col xs={24} sm={6} md={6}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                        <Button
                            type="primary"
                            icon={<PlayCircleOutlined />}
                            onClick={() => handleContinueLearning(course.id)}
                            style={{ width: '100%' }}
                        >
                            {course.progress === 0 ? 'Bắt đầu học' : 'Tiếp tục học'}
                        </Button>
                        <div style={{ textAlign: 'center', padding: '8px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px', width: '100%' }}>
                            <Text strong style={{ color: '#52c41a', fontSize: '14px' }}>
                                {course.progress}% hoàn thành
                            </Text>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );

    const renderStats = () => {
        const totalCourses = purchasedCourses.length;
        const inProgressCourses = purchasedCourses.filter(c => c.progress > 0 && c.progress < 100).length;
        const completedCourses = purchasedCourses.filter(c => c.progress === 100).length;
        const averageProgress = totalCourses > 0
            ? Math.round(purchasedCourses.reduce((sum, c) => sum + c.progress, 0) / totalCourses)
            : 0;

        return (
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={12} sm={6} md={3}>
                    <Card style={{ textAlign: 'center', padding: '16px' }}>
                        <Title level={3} style={{ color: '#1890ff', margin: '0 0 8px 0' }}>
                            {totalCourses}
                        </Title>
                        <Text type="secondary" style={{ fontSize: '14px' }}>Tổng khóa học</Text>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={3}>
                    <Card style={{ textAlign: 'center', padding: '16px' }}>
                        <Title level={3} style={{ color: '#faad14', margin: '0 0 8px 0' }}>
                            {inProgressCourses}
                        </Title>
                        <Text type="secondary" style={{ fontSize: '14px' }}>Đang học</Text>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={3}>
                    <Card style={{ textAlign: 'center', padding: '16px' }}>
                        <Title level={3} style={{ color: '#52c41a', margin: '0 0 8px 0' }}>
                            {completedCourses}
                        </Title>
                        <Text type="secondary" style={{ fontSize: '14px' }}>Hoàn thành</Text>
                    </Card>
                </Col>
                <Col xs={12} sm={6} md={3}>
                    <Card style={{ textAlign: 'center', padding: '16px' }}>
                        <Title level={3} style={{ color: '#722ed1', margin: '0 0 8px 0' }}>
                            {averageProgress}%
                        </Title>
                        <Text type="secondary" style={{ fontSize: '14px' }}>Tiến độ TB</Text>
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <Title level={2}>Khóa học của tôi</Title>
                <Text type="secondary">
                    Theo dõi tiến độ học tập và tiếp tục các khóa học đã mua
                </Text>
            </div>

            {purchasedCourses.length > 0 ? (
                <>
                    {renderStats()}

                    <Card bodyStyle={{ padding: '20px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <Space wrap>
                                <Button
                                    type={activeTab === 'all' ? 'primary' : 'default'}
                                    onClick={() => setActiveTab('all')}
                                    size="large"
                                >
                                    Tất cả ({purchasedCourses.length})
                                </Button>
                                <Button
                                    type={activeTab === 'in-progress' ? 'primary' : 'default'}
                                    onClick={() => setActiveTab('in-progress')}
                                    size="large"
                                >
                                    Đang học ({purchasedCourses.filter(c => c.progress > 0 && c.progress < 100).length})
                                </Button>
                                <Button
                                    type={activeTab === 'completed' ? 'primary' : 'default'}
                                    onClick={() => setActiveTab('completed')}
                                    size="large"
                                >
                                    Hoàn thành ({purchasedCourses.filter(c => c.progress === 100).length})
                                </Button>
                            </Space>
                        </div>

                        {filteredCourses.length > 0 ? (
                            <div>
                                {filteredCourses.map(renderCourseCard)}
                            </div>
                        ) : (
                            <Empty
                                description={
                                    <span>
                                        Không có khóa học nào trong danh mục "{activeTab === 'all' ? 'Tất cả' : activeTab === 'in-progress' ? 'Đang học' : 'Hoàn thành'}"
                                    </span>
                                }
                            />
                        )}
                    </Card>
                </>
            ) : (
                <Card>
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Bạn chưa có khóa học nào"
                    >
                        <Button type="primary" onClick={() => navigate('/')}>
                            Khám phá khóa học
                        </Button>
                    </Empty>
                </Card>
            )}
        </div>
    );
};

export default MyCoursesPage; 