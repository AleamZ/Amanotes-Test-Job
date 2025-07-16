import type { CartItem } from "./CardContext.interface";

export interface HeaderProps {
    onSearchChange: (searchTerm: string) => void;
    searchTerm: string;
    cartItems?: CartItem[];
    onCartClick?: () => void;
}

