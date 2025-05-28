import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useFavorites } from '../Context/FavoritesContext';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './View.css';

const View = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { favorites, toggleFavorite } = useFavorites();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) setQuantity(value);
    };

    const handleAddToCart = () => {
        if (product) {
            const productToAdd = {
                id: parseInt(product.id),
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description,
                rating: product.rating,
                quantity: quantity
            };
            addToCart(productToAdd, quantity);
        }
    };

    if (loading) {
        return (
            <div className="view-loading">
                <div className="view-skeleton">
                    <div className="view-skeleton-image"></div>
                    <div className="view-skeleton-content">
                        <div className="view-skeleton-title"></div>
                        <div className="view-skeleton-price"></div>
                        <div className="view-skeleton-description"></div>
                        <div className="view-skeleton-button"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="view-error">
                <h2>Error: {error || 'Product not found'}</h2>
                <button onClick={() => navigate('/')} className="back-button">
                    <FaArrowLeft /> Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="view-container">
            <button onClick={() => navigate(-1)} className="back-button">
                <FaArrowLeft /> Back
            </button>
            
            <div className="view-content">
                <div className="view-gallery">
                    <div className="view-main-image">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="view-thumbnails">
                        <img 
                            src={product.image} 
                            alt={product.title}
                            className={selectedImage === 0 ? 'active' : ''}
                            onClick={() => setSelectedImage(0)}
                        />
                        {/* Add more thumbnail images if available */}
                    </div>
                </div>

                <div className="view-details">
                    <div className="view-header">
                        <h1>{product.title}</h1>
                        <button 
                            className={`favorite-button ${favorites.some(f => f.id === product.id) ? 'active' : ''}`}
                            onClick={() => toggleFavorite(product)}
                        >
                            {favorites.some(f => f.id === product.id) ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </div>

                    <div className="view-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < Math.round(product.rating.rate) ? 'active' : ''} />
                            ))}
                        </div>
                        <span className="rating-count">({product.rating.count} reviews)</span>
                    </div>

                    <div className="view-price">
                        <span className="price">${product.price}</span>
                        {product.price > 50 && (
                            <span className="free-shipping">Free Shipping</span>
                        )}
                    </div>

                    <div className="view-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="view-actions">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={handleQuantityChange}
                                min="1"
                            />
                            <button onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>

                        <button className="add-to-cart-button" onClick={handleAddToCart}>
                            <FaShoppingCart /> Add to Cart
                        </button>
                    </div>

                    <div className="view-features">
                        <div className="feature">
                            <span className="feature-icon">🚚</span>
                            <span>Fast Delivery</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">🔄</span>
                            <span>Easy Returns</span>
                        </div>
                        <div className="feature">
                            <span className="feature-icon">🔒</span>
                            <span>Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View; 