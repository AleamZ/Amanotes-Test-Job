import React, { useState, useRef, useEffect } from 'react';
import { Spin, Empty } from 'antd';
import { SearchOutlined, ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import { useSearchSuggestions, useSearchHistory, saveSearchHistory } from '../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import type { SearchBoxProps } from '../../interface/SearchBox.interface';


const SearchBox: React.FC<SearchBoxProps> = ({
    value,
    onChange,
    onSearch,
    placeholder = "1Tìm kiếm khóa học, giáo trình...",
    className = ""
}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(value);
    const searchRef = useRef<HTMLDivElement>(null);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(value);
        }, 300);

        return () => clearTimeout(timer);
    }, [value]);

    // Get search suggestions and history
    const { data: suggestions, isLoading: suggestionsLoading } = useSearchSuggestions(debouncedQuery);
    const { data: searchHistory } = useSearchHistory();

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        setIsOpen(true);
    };

    const handleSearch = (searchValue: string) => {
        if (searchValue.trim()) {
            saveSearchHistory(searchValue);
            onSearch(searchValue);
            setIsOpen(false);
        }
    };

    const handleSuggestionClick = (suggestion: any) => {
        if (suggestion.type === 'course') {
            // Navigate to course detail
            navigate(`/courses/${suggestion.id}`);
        } else {
            // Set category as search term
            onChange(suggestion.text);
            handleSearch(suggestion.text);
        }
        setIsOpen(false);
    };

    const handleHistoryClick = (historyItem: string) => {
        onChange(historyItem);
        handleSearch(historyItem);
        setIsOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(value);
        }
    };

    const renderSuggestions = () => {
        if (suggestionsLoading) {
            return (
                <div className="search-dropdown-item loading">
                    <Spin size="small" />
                    <span>Đang tìm kiếm...</span>
                </div>
            );
        }

        if (!suggestions || suggestions.length === 0) {
            return (
                <div className="search-dropdown-item empty">
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không tìm thấy kết quả"
                    />
                </div>
            );
        }

        return suggestions.map((suggestion) => (
            <div
                key={suggestion.id}
                className="search-dropdown-item suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
            >
                <div className="suggestion-icon">
                    {suggestion.type === 'course' ? <SearchOutlined /> : <FireOutlined />}
                </div>
                <div className="suggestion-content">
                    <div className="suggestion-text">{suggestion.text}</div>
                    <div className="suggestion-category">{suggestion.category}</div>
                </div>
            </div>
        ));
    };

    const renderHistory = () => {
        if (!searchHistory || searchHistory.length === 0) return null;

        return (
            <>
                <div className="search-dropdown-section">
                    <div className="section-title">
                        <ClockCircleOutlined />
                        <span>Lịch sử tìm kiếm</span>
                    </div>
                    {searchHistory.slice(0, 5).map((item: string, index: number) => (
                        <div
                            key={index}
                            className="search-dropdown-item history"
                            onClick={() => handleHistoryClick(item)}
                        >
                            <div className="history-icon">
                                <ClockCircleOutlined />
                            </div>
                            <div className="history-text">{item}</div>
                        </div>
                    ))}
                </div>
                <div className="search-dropdown-divider" />
            </>
        );
    };

    return (
        <div className={`search-box-container ${className}`} ref={searchRef}>
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsOpen(true)}
                    className="search-input"
                />
                <button
                    className="search-button"
                    onClick={() => handleSearch(value)}
                >
                    <SearchOutlined />
                </button>
            </div>

            {isOpen && (
                <div className="search-dropdown">
                    {value.trim() ? (
                        <div className="search-dropdown-section">
                            <div className="section-title">
                                <SearchOutlined />
                                <span>Gợi ý tìm kiếm</span>
                            </div>
                            {renderSuggestions()}
                        </div>
                    ) : (
                        renderHistory()
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBox; 