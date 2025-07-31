import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { learningPaths, mockProducts } from '../services/mockData';
// Removed unused import LearningPath
import '../styles/pages/roadmap-detail.page.scss';

const RoadmapDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Tìm lộ trình học theo ID
    const learningPath = useMemo(() => {
        return learningPaths.find(path => path.id === id);
    }, [id]);

    // Lấy danh sách khóa học liên quan
    const relatedCourses = useMemo(() => {
        if (!learningPath) return [];
        return mockProducts.filter(course =>
            learningPath.courses.includes(course.id)
        );
    }, [learningPath]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (!learningPath) {
        return (
            <div className="roadmap-detail-page">
                <div className="roadmap-detail-page__error">
                    <i className="fas fa-exclamation-triangle"></i>
                    <h2>Không tìm thấy lộ trình học</h2>
                    <p>Lộ trình học bạn đang tìm kiếm không tồn tại.</p>
                    <Link to="/roadmap" className="back-button">
                        <i className="fas fa-arrow-left"></i>
                        Quay lại trang lộ trình
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="roadmap-detail-page">
            <div className="roadmap-detail-page__header">
                <div className="roadmap-detail-page__breadcrumb">
                    <Link to="/roadmap" className="breadcrumb-link">
                        <i className="fas fa-arrow-left"></i>
                        Lộ trình học
                    </Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{learningPath.title}</span>
                </div>

                <div className="roadmap-detail-page__hero">
                    <div className="hero-image">
                        <img src={learningPath.image} alt={learningPath.title} />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className="hero-content">
                        <h1 className="hero-title">{learningPath.title}</h1>
                        <p className="hero-description">{learningPath.description}</p>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <i className="fas fa-clock"></i>
                                <div className="stat-content">
                                    <span className="stat-label">Thời gian học</span>
                                    <span className="stat-value">{learningPath.duration}</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <i className="fas fa-signal"></i>
                                <div className="stat-content">
                                    <span className="stat-label">Độ khó</span>
                                    <span className="stat-value">{learningPath.difficulty}</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <i className="fas fa-graduation-cap"></i>
                                <div className="stat-content">
                                    <span className="stat-label">Số khóa học</span>
                                    <span className="stat-value">{learningPath.courseCount}</span>
                                </div>
                            </div>
                            <div className="stat-item">
                                <i className="fas fa-money-bill-wave"></i>
                                <div className="stat-content">
                                    <span className="stat-label">Mức lương</span>
                                    <span className="stat-value">{learningPath.salary}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="roadmap-detail-page__content">
                <div className="content-section">
                    <h2 className="section-title">Lộ trình học tập</h2>
                    <p className="section-description">
                        Dưới đây là các khóa học được thiết kế theo thứ tự học tập tối ưu để bạn có thể
                        nắm vững kiến thức từ cơ bản đến nâng cao.
                    </p>

                    <div className="learning-timeline">
                        {relatedCourses.map((course, index) => (
                            <div key={course.id} className="timeline-item">
                                <div className="timeline-marker">
                                    <span className="marker-number">{index + 1}</span>
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <h3 className="timeline-title">{course.name}</h3>
                                        <div className="timeline-duration">
                                            <i className="fas fa-clock"></i>
                                            <span>{course.duration}</span>
                                        </div>
                                    </div>

                                    <div className="timeline-body">
                                        <div className="timeline-description">
                                            <p>{course.shortDescription}</p>
                                            <div className="timeline-details">
                                                <div className="detail-item">
                                                    <i className="fas fa-user"></i>
                                                    <span>Giảng viên: {course.instructor}</span>
                                                </div>
                                                <div className="detail-item">
                                                    <i className="fas fa-star"></i>
                                                    <span>Đánh giá: {course.rating} ({course.reviews} đánh giá)</span>
                                                </div>
                                                <div className="detail-item">
                                                    <i className="fas fa-signal"></i>
                                                    <span>Cấp độ: {course.level}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="course-card">
                                            <div className="course-card__image">
                                                <img src={course.image} alt={course.name} />
                                                <div className="course-card__level">{course.level}</div>
                                            </div>
                                            <div className="course-card__content">
                                                <div className="course-card__price">
                                                    {formatPrice(course.price)}
                                                </div>
                                                <Link to={`/courses/${course.id}`} className="course-card__button">
                                                    Xem chi tiết khóa học
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {index < relatedCourses.length - 1 && (
                                    <div className="timeline-connector"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadmapDetailPage; 