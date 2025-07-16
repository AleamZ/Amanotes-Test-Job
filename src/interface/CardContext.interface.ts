export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartItemCount: () => number;
    getCartTotal: () => number;
    isCartBouncing: boolean;
    triggerCartBounce: () => void;
}
export interface CartProviderProps {
    children: React.ReactNode;
}
export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}