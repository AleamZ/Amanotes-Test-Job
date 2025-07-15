import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { mockProducts } from '../services/mockData';
import type { Product } from '../interface/Product.interface';
import type { FilterState, FilterContextType } from '../interface/FilterBar.interface';


const initialFilterState: FilterState = {
    price: {
        free: false,
        under500k: false,
        between500kAnd1M: false,
        above1M: false,
    },
    level: {
        beginner: false,
        intermediate: false,
        advanced: false,
    },
    duration: {
        under30h: false,
        between30hAnd45h: false,
        between45hAnd60h: false,
        above60h: false,
    },
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState<FilterState>(initialFilterState);
    const [allCourses, setAllCourses] = useState<Product[]>(mockProducts);
    const [filteredCourses, setFilteredCourses] = useState<Product[]>(mockProducts);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Apply filters to courses
        let result = [...allCourses];

        // Filter by price
        if (Object.values(filters.price).some(value => value)) {
            result = result.filter(course => {
                if (filters.price.free && course.price === 0) return true;
                if (filters.price.under500k && course.price > 0 && course.price < 500000) return true;
                if (filters.price.between500kAnd1M && course.price >= 500000 && course.price <= 1000000) return true;
                if (filters.price.above1M && course.price > 1000000) return true;
                return false;
            });
        }

        // Filter by level
        if (Object.values(filters.level).some(value => value)) {
            result = result.filter(course => {
                if (filters.level.beginner && course.level === 'Beginner') return true;
                if (filters.level.intermediate && course.level === 'Intermediate') return true;
                if (filters.level.advanced && course.level === 'Advanced') return true;
                return false;
            });
        }

        // Filter by duration
        if (Object.values(filters.duration).some(value => value)) {
            result = result.filter(course => {
                const hours = parseInt(course.duration.split(' ')[0]);
                if (filters.duration.under30h && hours < 30) return true;
                if (filters.duration.between30hAnd45h && hours >= 30 && hours < 45) return true;
                if (filters.duration.between45hAnd60h && hours >= 45 && hours < 60) return true;
                if (filters.duration.above60h && hours >= 60) return true;
                return false;
            });
        }

        setFilteredCourses(result);
    }, [filters, allCourses]);

    // Invalidate search queries when filters change
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['search'] });
    }, [filters, queryClient]);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        queryClient.invalidateQueries({ queryKey: ['search'] });
    };

    return (
        <FilterContext.Provider value={{
            filters,
            setFilters,
            filteredCourses,
            allCourses,
            setAllCourses,
            searchTerm,
            onSearchChange: handleSearchChange
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}; 