import type { Product } from "./Product.interface";

export interface FilterBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface FilterState {
    price: {
        free: boolean;
        under500k: boolean;
        between500kAnd1M: boolean;
        above1M: boolean;
    };
    level: {
        beginner: boolean;
        intermediate: boolean;
        advanced: boolean;
    };
    duration: {
        under30h: boolean;
        between30hAnd45h: boolean;
        between45hAnd60h: boolean;
        above60h: boolean;
    };
}

export interface FilterContextType {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    filteredCourses: Product[];
    allCourses: Product[];
    setAllCourses: React.Dispatch<React.SetStateAction<Product[]>>;
    searchTerm: string;
    onSearchChange: (term: string) => void;
}