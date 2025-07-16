import type { Product } from "./Product.interface";

export interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export interface SearchParams {
    query: string;
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface SearchResult {
    products: Product[];
    total: number;
    hasMore: boolean;
}