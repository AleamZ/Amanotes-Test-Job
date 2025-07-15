export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    shortDescription: string;
    fullDescription: string;
    category: string;
    rating: number;
    reviews: number;
    instructor: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    isLiked: boolean;
    tags: string[];
}

export interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
    onToggleLike: (productId: string) => void;
}


export interface PriceFilter {
    min: number;
    max: number;
    label: string;
}

export interface SearchFilters {
    searchTerm: string;
    priceRange: PriceFilter | null;
    category: string;
    level: string;
}

export interface User {
    id: string;
    name: string;
    preferences: string[];
    viewHistory: string[];
    likedProducts: string[];
}

