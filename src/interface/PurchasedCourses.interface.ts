import type { Product } from "./Product.interface";

export interface PurchasedCourse extends Product {
    purchaseDate: Date;
    progress: number; // 0-100
    lastAccessed: Date;
}

export interface PurchasedCoursesContextType {
    purchasedCourses: PurchasedCourse[];
    addPurchasedCourse: (course: Product) => void;
    updateProgress: (courseId: string, progress: number) => void;
    updateLastAccessed: (courseId: string) => void;
    getPurchasedCourse: (courseId: string) => PurchasedCourse | undefined;
    isCoursePurchased: (courseId: string) => boolean;
}
export interface PurchasedCoursesProviderProps {
    children: React.ReactNode;
}