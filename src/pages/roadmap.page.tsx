import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { learningPaths, categories } from '../services/mockData';
import type { LearningPath } from '../services/mockData';
import '../styles/pages/roadmap.page.scss';

const RoadmapPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

    // Lọc lộ trình theo category
    const filteredPaths = selectedCategory === 'Tất cả'
        ? learningPaths
        : learningPaths.filter(path => path.category === selectedCategory);

    const renderLearningPathCard = (path: LearningPath) => (
        <div key={path.id} className="learning-path-card">
            <div className="learning-path-card__image">
                <img src={path.image} alt={path.title} />
                <div className="learning-path-card__category">{path.category}</div>
            </div>
            <div className="learning-path-card__content">
                <h3 className="learning-path-card__title">{path.title}</h3>
                <p className="learning-path-card__description">{path.description}</p>

                <div className="learning-path-card__stats">
                    <div className="stat-item">
                        <i className="fas fa-clock"></i>
                        <span>{path.duration}</span>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-signal"></i>
                        <span>{path.difficulty}</span>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-graduation-cap"></i>
                        <span>{path.courseCount} khóa học</span>
                    </div>
                </div>

                <div className="learning-path-card__salary">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>{path.salary}</span>
                </div>

                <Link to={`/roadmap/${path.id}`} className="learning-path-card__button">
                    Xem chi tiết lộ trình
                </Link>
            </div>
        </div>
    );

    return (
        <div className="roadmap-page">
            <div className="roadmap-page__header">
                <h1 className="roadmap-page__title">Lộ trình học</h1>
                <p className="roadmap-page__subtitle">
                    Chọn lộ trình học phù hợp với mục tiêu nghề nghiệp của bạn
                </p>
            </div>

            <div className="roadmap-page__filters">
                <div className="filter-group">
                    <label htmlFor="category-filter">Lĩnh vực:</label>
                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="filter-select"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="roadmap-page__content">
                {filteredPaths.length === 0 ? (
                    <div className="roadmap-page__empty">
                        <i className="fas fa-search"></i>
                        <h3>Không tìm thấy lộ trình học</h3>
                        <p>Hãy thử thay đổi bộ lọc để tìm lộ trình phù hợp</p>
                    </div>
                ) : (
                    <div className="learning-paths-grid">
                        {filteredPaths.map(renderLearningPathCard)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoadmapPage; 