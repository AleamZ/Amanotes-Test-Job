import React from 'react';
import { Checkbox } from 'antd';
import { useFilter } from '../../context/FilterContext';
import type { FilterBarProps } from '../../interface/FilterBar.interface';


const FilterBar: React.FC<FilterBarProps> = ({
    isOpen
}) => {
    const { filters, setFilters } = useFilter();

    const handleFilterChange = (category: 'price' | 'level' | 'duration', key: string) => {
        setFilters(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key as keyof typeof prev[typeof category]]
            }
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="filter-content">
            <div className="filter-section">
                <h4>Giá</h4>
                <div className="filter-options">
                    <Checkbox
                        checked={filters.price.free}
                        onChange={() => handleFilterChange('price', 'free')}
                    >
                        Miễn phí
                    </Checkbox>
                    <Checkbox
                        checked={filters.price.under500k}
                        onChange={() => handleFilterChange('price', 'under500k')}
                    >
                        Dưới 500.000đ
                    </Checkbox>
                    <Checkbox
                        checked={filters.price.between500kAnd1M}
                        onChange={() => handleFilterChange('price', 'between500kAnd1M')}
                    >
                        500.000đ - 1.000.000đ
                    </Checkbox>
                    <Checkbox
                        checked={filters.price.above1M}
                        onChange={() => handleFilterChange('price', 'above1M')}
                    >
                        Trên 1.000.000đ
                    </Checkbox>
                </div>
            </div>

            <div className="filter-section">
                <h4>Cấp độ</h4>
                <div className="filter-options">
                    <Checkbox
                        checked={filters.level.beginner}
                        onChange={() => handleFilterChange('level', 'beginner')}
                    >
                        Beginner
                    </Checkbox>
                    <Checkbox
                        checked={filters.level.intermediate}
                        onChange={() => handleFilterChange('level', 'intermediate')}
                    >
                        Intermediate
                    </Checkbox>
                    <Checkbox
                        checked={filters.level.advanced}
                        onChange={() => handleFilterChange('level', 'advanced')}
                    >
                        Advanced
                    </Checkbox>
                </div>
            </div>

            <div className="filter-section">
                <h4>Thời lượng</h4>
                <div className="filter-options">
                    <Checkbox
                        checked={filters.duration.under30h}
                        onChange={() => handleFilterChange('duration', 'under30h')}
                    >
                        Dưới 30 giờ
                    </Checkbox>
                    <Checkbox
                        checked={filters.duration.between30hAnd45h}
                        onChange={() => handleFilterChange('duration', 'between30hAnd45h')}
                    >
                        30-45 giờ
                    </Checkbox>
                    <Checkbox
                        checked={filters.duration.between45hAnd60h}
                        onChange={() => handleFilterChange('duration', 'between45hAnd60h')}
                    >
                        45-60 giờ
                    </Checkbox>
                    <Checkbox
                        checked={filters.duration.above60h}
                        onChange={() => handleFilterChange('duration', 'above60h')}
                    >
                        Trên 60 giờ
                    </Checkbox>
                </div>
            </div>
        </div>
    );
};

export default FilterBar; 