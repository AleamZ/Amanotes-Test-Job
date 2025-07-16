import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Rate, Divider, Card, Row, Col, Collapse, message } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, UserOutlined, StarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { mockProducts } from '../services/mockData';
import { useCart } from '../context/CartContext';
import { usePurchasedCourses } from '../context/PurchasedCoursesContext';
// import './course-detail.page.scss';

const { Panel } = Collapse;

const CourseDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isCoursePurchased, getPurchasedCourse, updateLastAccessed } = usePurchasedCourses();
    const course = mockProducts.find(c => c.id === id);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!course) {
        return (
            <div className="course-detail-page">
                <div className="not-found">
                    <h2>Không tìm thấy khóa học</h2>
                    <p>Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                    <Button type="primary" onClick={() => navigate('/')}>Quay về trang chủ</Button>
                </div>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        if (price === 0) return 'Miễn phí';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleAddToCart = () => {
        addToCart({
            id: course.id,
            name: course.name,
            price: course.price,
            image: course.image,
        });
        message.success(`Đã thêm "${course.name}" vào giỏ hàng!`);
    };

    const handleEnroll = () => {
        // Add to cart and navigate to checkout
        handleAddToCart();
        message.info('Chuyển đến trang thanh toán...');
        // Navigate to checkout page
        setTimeout(() => {
            navigate('/checkout');
        }, 1000);
    };

    const handleContinueLearning = () => {
        updateLastAccessed(course.id);
        message.info('Chuyển đến nội dung khóa học...');
    };

    const isPurchased = isCoursePurchased(course.id);
    const purchasedCourse = getPurchasedCourse(course.id);

    return (
        <div className="course-detail-page">
            {/* Header */}
            <div className="course-detail-header">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    className="back-btn"
                >
                    Quay lại
                </Button>
            </div>

            {/* Course Hero Section */}
            <div className="course-hero">
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={10}>
                        <div className="course-image-container">
                            <img src={course.image} alt={course.name} className="course-image" />
                            <div className="course-overlay">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="enroll-btn"
                                    onClick={handleEnroll}
                                >
                                    Đăng ký khóa học
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={14}>
                        <div className="course-info" style={{ display: 'flex', gap: 32 }}>
                            <div className="course-info-main" style={{ flex: 1 }}>
                                <Tag color="blue" className="category-tag">{course.category}</Tag>
                                <h1 className="course-title">{course.name}</h1>
                                <p className="course-description">{course.shortDescription}</p>

                                <div className="course-meta">
                                    <div className="meta-item">
                                        <UserOutlined />
                                        <span>Giảng viên: {course.instructor}</span>
                                    </div>
                                    <div className="meta-item">
                                        <ClockCircleOutlined />
                                        <span>Thời lượng: {course.duration}</span>
                                    </div>
                                    <div className="meta-item">
                                        <StarOutlined />
                                        <span>Trình độ: {course.level}</span>
                                    </div>
                                </div>

                                <div className="course-rating">
                                    <Rate disabled defaultValue={course.rating} />
                                    <span className="rating-text">
                                        {course.rating} ({course.reviews} đánh giá)
                                    </span>
                                </div>

                                <div className="course-price">
                                    <span className="price">{formatPrice(course.price)}</span>
                                    {course.price > 0 && (
                                        <span className="original-price">
                                            {formatPrice(course.price * 1.2)}
                                        </span>
                                    )}
                                </div>

                                <div className="course-tags">
                                    {course.tags.map((tag, index) => (
                                        <Tag key={index} color="default">{tag}</Tag>
                                    ))}
                                </div>
                            </div>
                            <div className="course-info-actions" style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
                                {isPurchased ? (
                                    <>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="continue-btn"
                                            style={{ width: '100%' }}
                                            onClick={handleContinueLearning}
                                        >
                                            Tiếp tục học
                                        </Button>
                                        {purchasedCourse && (
                                            <div style={{ textAlign: 'center', padding: '8px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
                                                <div style={{ fontSize: '12px', color: '#52c41a', fontWeight: 'bold' }}>
                                                    Tiến độ: {purchasedCourse.progress}%
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="enroll-btn"
                                            style={{ width: '100%' }}
                                            onClick={handleEnroll}
                                        >
                                            Đăng ký khóa học
                                        </Button>
                                        <Button
                                            type="default"
                                            size="large"
                                            className="add-cart-btn"
                                            style={{ width: '100%' }}
                                            icon={<ShoppingCartOutlined />}
                                            onClick={handleAddToCart}
                                        >
                                            Bỏ vào giỏ hàng
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Course Content */}
            <div className="course-content">
                <Row gutter={[32, 32]}>
                    <Col xs={24} lg={18}>
                        {/* Course Description */}
                        <Card title="Mô tả khóa học" className="content-card">
                            <p>{course.fullDescription}</p>
                        </Card>

                        {/* Course Curriculum - dùng Collapse */}
                        <Card title="Nội dung khóa học" className="content-card">
                            <Collapse defaultActiveKey={["1"]} accordion>
                                <Panel header="Phần 1: Giới thiệu và cài đặt" key="1">
                                    <ul>
                                        <li>Tổng quan về {course.category}</li>
                                        <li>Cài đặt môi trường phát triển</li>
                                        <li>Làm quen với các công cụ cần thiết</li>
                                    </ul>
                                </Panel>
                                <Panel header="Phần 2: Kiến thức cơ bản" key="2">
                                    <ul>
                                        <li>Học các khái niệm cơ bản</li>
                                        <li>Thực hành với các ví dụ đơn giản</li>
                                        <li>Làm bài tập thực hành</li>
                                    </ul>
                                </Panel>
                                <Panel header="Phần 3: Kiến thức nâng cao" key="3">
                                    <ul>
                                        <li>Học các kỹ thuật nâng cao</li>
                                        <li>Xây dựng dự án thực tế</li>
                                        <li>Thực hành và tối ưu hóa</li>
                                    </ul>
                                </Panel>
                            </Collapse>
                        </Card>

                        {/* Prerequisites */}
                        <Card title="Yêu cầu trước khi học" className="content-card">
                            <div className="prerequisites">
                                <h4>Kiến thức cần có:</h4>
                                <ul>
                                    <li>Hiểu biết cơ bản về máy tính</li>
                                    <li>Khả năng đọc hiểu tiếng Anh cơ bản</li>
                                    <li>Máy tính có kết nối internet</li>
                                </ul>

                                <h4>Phần mềm cần cài đặt:</h4>
                                <ul>
                                    <li>Code editor (VS Code, Sublime Text, etc.)</li>
                                    <li>Trình duyệt web hiện đại</li>
                                    <li>Các công cụ phát triển khác (sẽ hướng dẫn trong khóa học)</li>
                                </ul>
                            </div>
                        </Card>
                    </Col>

                    <Col xs={24} lg={6}>
                        {/* Course Features */}
                        <Card title="Điểm nổi bật" className="sidebar-card">
                            <div className="features">
                                <div className="feature-item">
                                    <span className="feature-icon">📚</span>
                                    <div>
                                        <h4>Hơn 50 bài giảng</h4>
                                        <p>Nội dung chi tiết, dễ hiểu</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">💻</span>
                                    <div>
                                        <h4>10 dự án thực tế</h4>
                                        <p>Áp dụng kiến thức vào thực tế</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">🎯</span>
                                    <div>
                                        <h4>Chứng chỉ hoàn thành</h4>
                                        <p>Nhận chứng chỉ sau khi hoàn thành</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">🔄</span>
                                    <div>
                                        <h4>Hỗ trợ trọn đời</h4>
                                        <p>Được hỗ trợ và cập nhật liên tục</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Instructor Info */}
                        <Card title="Thông tin giảng viên" className="sidebar-card">
                            <div className="instructor-info">
                                <div className="instructor-avatar">
                                    <UserOutlined />
                                </div>
                                <h4>{course.instructor}</h4>
                                <p>Chuyên gia {course.category} với nhiều năm kinh nghiệm</p>
                                <div className="instructor-stats">
                                    <div className="stat">
                                        <span className="stat-number">1000+</span>
                                        <span className="stat-label">Học viên</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-number">50+</span>
                                        <span className="stat-label">Khóa học</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default CourseDetail; 