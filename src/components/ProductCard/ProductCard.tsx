import React from 'react';
import { useCart } from '../../context/CartContext';
import type { ProductCardProps } from '../../interface/Product.interface';

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onViewDetails,
    onToggleLike
}) => {
    const { addToCart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });

        // Show success message (you can replace this with a proper notification system)
        console.log(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };

    return (
        <div className="product-card">
            <div className="product-card__image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                />
                <button
                    className={`product-card__like-btn ${product.isLiked ? 'liked' : ''}`}
                    onClick={() => onToggleLike(product.id)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill={product.isLiked ? 'currentColor' : 'none'}
                        />
                    </svg>
                </button>
                <div className="product-card__level">{product.level}</div>
            </div>

            <div className="product-card__content">
                <div className="product-card__category">{product.category}</div>
                <h3 className="product-card__title">{product.name}</h3>
                <p className="product-card__instructor">Giảng viên: {product.instructor}</p>
                <p className="product-card__description">{product.shortDescription}</p>

                <div className="product-card__rating">
                    <div className="product-card__stars">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                            >
                                ★
                            </span>
                        ))}
                        <span className="product-card__rating-text">
                            {product.rating} ({product.reviews} đánh giá)
                        </span>
                    </div>
                </div>

                <div className="product-card__meta">
                    <span className="product-card__duration">⏱ {product.duration}</span>
                </div>

                <div className="product-card__footer">
                    <div className="product-card__price">{formatPrice(product.price)}</div>
                    <div className="product-card__actions">
                        <button
                            className="product-card__add-to-cart-btn"
                            onClick={handleAddToCart}
                        >
                            Thêm vào giỏ
                        </button>
                        <button
                            className="product-card__details-btn"
                            onClick={() => onViewDetails(product)}
                        >
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 