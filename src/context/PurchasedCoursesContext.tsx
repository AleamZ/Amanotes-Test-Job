import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product } from '../interface/Product.interface';
import type { PurchasedCoursesContextType, PurchasedCoursesProviderProps, PurchasedCourse } from '../interface/PurchasedCourses.interface';

const PurchasedCoursesContext = createContext<PurchasedCoursesContextType | undefined>(undefined);

export const usePurchasedCourses = () => {
    const context = useContext(PurchasedCoursesContext);
    if (context === undefined) {
        throw new Error('usePurchasedCourses must be used within a PurchasedCoursesProvider');
    }
    return context;
};



export const PurchasedCoursesProvider: React.FC<PurchasedCoursesProviderProps> = ({ children }) => {
    // Initialize with some sample purchased courses for testing
    const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([
        {
            id: '1',
            name: 'React từ cơ bản đến nâng cao',
            price: 1200000,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
            category: 'Front-end',
            level: 'Intermediate',
            rating: 4.8,
            reviews: 1250,
            instructor: 'Nguyễn Văn A',
            duration: '20 giờ',
            shortDescription: 'Học React từ cơ bản đến nâng cao với dự án thực tế',
            fullDescription: 'Khóa học React toàn diện từ cơ bản đến nâng cao...',
            tags: ['React', 'JavaScript', 'Frontend'],
            isLiked: false,
            purchaseDate: new Date('2024-01-15'),
            progress: 65,
            lastAccessed: new Date('2024-01-20'),
        },
        {
            id: '2',
            name: 'Node.js Backend Development',
            price: 1500000,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
            category: 'Back-end',
            level: 'Advanced',
            rating: 4.9,
            reviews: 890,
            instructor: 'Trần Thị B',
            duration: '25 giờ',
            shortDescription: 'Xây dựng backend với Node.js và Express',
            fullDescription: 'Khóa học Node.js backend development...',
            tags: ['Node.js', 'Express', 'Backend'],
            isLiked: false,
            purchaseDate: new Date('2024-01-10'),
            progress: 100,
            lastAccessed: new Date('2024-01-18'),
        }
    ]);

    const addPurchasedCourse = useCallback((course: Product) => {
        setPurchasedCourses(prevCourses => {
            // Check if course already exists
            const existingCourse = prevCourses.find(c => c.id === course.id);
            if (existingCourse) {
                return prevCourses; // Course already purchased
            }

            // Add new purchased course
            const newPurchasedCourse: PurchasedCourse = {
                ...course,
                purchaseDate: new Date(),
                progress: 0,
                lastAccessed: new Date(),
            };

            return [...prevCourses, newPurchasedCourse];
        });
    }, []);

    const updateProgress = useCallback((courseId: string, progress: number) => {
        setPurchasedCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === courseId
                    ? { ...course, progress: Math.min(100, Math.max(0, progress)) }
                    : course
            )
        );
    }, []);

    const updateLastAccessed = useCallback((courseId: string) => {
        setPurchasedCourses(prevCourses =>
            prevCourses.map(course =>
                course.id === courseId
                    ? { ...course, lastAccessed: new Date() }
                    : course
            )
        );
    }, []);

    const getPurchasedCourse = useCallback((courseId: string) => {
        return purchasedCourses.find(course => course.id === courseId);
    }, [purchasedCourses]);

    const isCoursePurchased = useCallback((courseId: string) => {
        return purchasedCourses.some(course => course.id === courseId);
    }, [purchasedCourses]);

    const value: PurchasedCoursesContextType = {
        purchasedCourses,
        addPurchasedCourse,
        updateProgress,
        updateLastAccessed,
        getPurchasedCourse,
        isCoursePurchased,
    };

    return (
        <PurchasedCoursesContext.Provider value={value}>
            {children}
        </PurchasedCoursesContext.Provider>
    );
}; 