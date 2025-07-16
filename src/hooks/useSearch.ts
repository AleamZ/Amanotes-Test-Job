import { useQuery } from '@tanstack/react-query';
import { mockProducts } from '../services/mockData';
import type { SearchParams, SearchResult } from '../interface/SearchBox.interface';

// Simulate API call with delay
const searchProducts = async (params: SearchParams): Promise<SearchResult> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filteredProducts = [...mockProducts];

    // Filter by search query (only if query is not empty)
    if (params.query && params.query.trim()) {
        const query = params.query.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.shortDescription.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    // Filter by category (only if category is specified and not 'all')
    if (params.category && params.category !== 'all' && params.category !== 'Tất cả') {
        filteredProducts = filteredProducts.filter(product =>
            product.category === params.category
        );
    }

    // Filter by level (only if level is specified and not 'all')
    if (params.level && params.level !== 'all') {
        filteredProducts = filteredProducts.filter(product =>
            product.level === params.level
        );
    }

    // Filter by price range
    if (params.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= params.minPrice!
        );
    }

    if (params.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= params.maxPrice!
        );
    }

    return {
        products: filteredProducts,
        total: filteredProducts.length,
        hasMore: false
    };
};

export const useSearch = (params: SearchParams) => {
    return useQuery({
        queryKey: ['search', params],
        queryFn: () => searchProducts(params),
        enabled: true, // Always enabled to show all courses when no search
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook for getting search suggestions
export const useSearchSuggestions = (query: string) => {
    return useQuery({
        queryKey: ['search-suggestions', query],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 200));

            if (!query.trim()) return [];

            const suggestions = mockProducts
                .filter(product =>
                    product.name.toLowerCase().includes(query.toLowerCase()) ||
                    product.category.toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 5)
                .map(product => ({
                    id: product.id,
                    text: product.name,
                    category: product.category,
                    type: 'course' as const
                }));

            // Add category suggestions
            const categories = [...new Set(mockProducts.map(p => p.category))];
            const categorySuggestions = categories
                .filter(cat => cat.toLowerCase().includes(query.toLowerCase()))
                .slice(0, 3)
                .map(cat => ({
                    id: `cat-${cat}`,
                    text: cat,
                    category: cat,
                    type: 'category' as const
                }));

            return [...suggestions, ...categorySuggestions];
        },
        enabled: query.trim().length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook for getting search history
export const useSearchHistory = () => {
    return useQuery({
        queryKey: ['search-history'],
        queryFn: async () => {
            // In a real app, this would come from localStorage or API
            const history = localStorage.getItem('searchHistory');
            return history ? JSON.parse(history) : [];
        },
        staleTime: 0, // Always fresh
    });
};

// Hook for saving search history
export const saveSearchHistory = (query: string) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newHistory = [query, ...history.filter((item: string) => item !== query)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
}; 