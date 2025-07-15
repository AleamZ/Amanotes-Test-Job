import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../context/FilterContext';
import { categories, mockProducts } from '../services/mockData';
import { Tabs, Spin, Empty } from 'antd';
import { useSearch } from '../hooks/useSearch';
// import './homepage.page.scss';

const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const { filteredCourses, setAllCourses, searchTerm } = useFilter();
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    // Use React Query for search
    const { data: searchData, isLoading, error } = useSearch({
        query: searchTerm || '',
        category: activeCategory === 'Tất cả' ? undefined : activeCategory
    });

    // Update filtered courses when search data changes
    React.useEffect(() => {
        if (searchData) {
            setAllCourses(searchData.products);
        } else if (!searchTerm) {
            // If no search term and no search data, show all courses
            setAllCourses(mockProducts);
        }
    }, [searchData, searchTerm, setAllCourses]);

    // Lọc theo danh mục tab
    const coursesByCategory = (category: string) => {
        if (category === 'Tất cả') return filteredCourses;
        return filteredCourses.filter(course => course.category === category);
    };

    // Get courses to display based on current state
    const getDisplayCourses = (category: string) => {
        const categoryCourses = coursesByCategory(category);

        // If no courses in current category but we have search results, show all search results
        if (categoryCourses.length === 0 && searchTerm && searchData?.products) {
            return searchData.products;
        }

        return categoryCourses;
    };

    if (isLoading) {
        return (
            <div className="homepage">
                <h1>Khóa Học</h1>
                <div className="loading-container">
                    <Spin size="large" />
                    <p>Đang tải khóa học...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="homepage">
                <h1>Khóa Học</h1>
                <div className="error-container">
                    <Empty
                        description="Có lỗi xảy ra khi tải khóa học"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="homepage">
            <h1>Khóa Học</h1>
            <Tabs
                activeKey={activeCategory}
                onChange={setActiveCategory}
                items={categories.map(category => ({
                    key: category,
                    label: category,
                    children: (
                        <div className="courses-grid">
                            {getDisplayCourses(category).length > 0 ? (
                                getDisplayCourses(category).map(course => (
                                    <div
                                        key={course.id}
                                        className="course-card"
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="course-image">
                                            <img src={course.image} alt={course.name} />
                                        </div>
                                        <div className="course-content">
                                            <h3>{course.name}</h3>
                                            <p className="instructor">{course.instructor}</p>
                                            <div className="course-info">
                                                <p className="price">
                                                    {course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString()}đ`}
                                                </p>
                                                <div className="meta-info">
                                                    <p className="level">{course.level}</p>
                                                    <p className="duration">{course.duration}</p>
                                                </div>
                                                <div className="rating">
                                                    <span className="stars">{'★'.repeat(Math.floor(course.rating))}</span>
                                                    <span className="rating-number">({course.rating})</span>
                                                    <span className="reviews">({course.reviews} đánh giá)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-courses">
                                    <p>Không tìm thấy khóa học phù hợp với bộ lọc đã chọn.</p>
                                </div>
                            )}
                        </div>
                    )
                }))}
            />
        </div>
    );
};

export default Homepage;