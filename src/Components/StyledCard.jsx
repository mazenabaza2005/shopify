import React from 'react';
import styled from 'styled-components';
import { BookOutlined, BookFilled } from "@ant-design/icons";
import { useFavorites } from '../Context/FavoritesContext';
import { useCart } from '../Context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './StyledCard.css';

const Card = ({ rate, title, image, description, price, onView, quantity, onQuantityChange, onRemove, isCartItem }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const handleFavClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite({ rate, title, image, description, price });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ rate, title, image, description, price });
    toast.success('Added to cart! 🛒', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const isFavorite = favorites.some(item => item.title === title);

  // Simple rating display
  const displayRating = () => {
    if (typeof rate === 'object' && rate !== null) {
      return rate.rate || 0;
    }
    if (typeof rate === 'number') {
      return rate;
    }
    if (typeof rate === 'string') {
      return parseFloat(rate) || 0;
    }
    return 0;
  };

  const handleQuantityChange = (e, newQuantity) => {
    e.stopPropagation();
    e.preventDefault();
    onQuantityChange(newQuantity);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove();
  };

  return (
    <StyledWrapper>
      <article className="card">
        <section className="card__hero" style={{ backgroundImage: `url(${image})` }}>
          <div className="card__overlay">
            <header className="card__hero-header">
              <span className="card__rating">{displayRating()} ★</span>
              {!isCartItem && (
                <div className="card__icon" onClick={handleFavClick}>
                  {isFavorite ? (
                    <BookFilled className="favorite-icon filled" />
                  ) : (
                    <BookOutlined className="favorite-icon" />
                  )}
                </div>
              )}
            </header>
            <h2 className="card__title">{title}</h2>
          </div>
        </section>
        <footer className="card__footer">
          <div className="card__content">
            <p className="card__description">{description}</p>
            <div className="card__price">
              ${(price * (quantity || 1)).toFixed(2)}
            </div>
          </div>
          <div className="card__actions">
            {isCartItem ? (
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={(e) => handleQuantityChange(e, quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={(e) => handleQuantityChange(e, quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="card__btn remove-btn" 
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <button className="card__btn view-btn" onClick={onView}>View</button>
                <button className="card__btn cart-btn" onClick={handleAddToCart}>Add to Cart</button>
              </>
            )}
          </div>
        </footer>
      </article>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    margin: auto;
    width: min(300px, 100%);
    background-color: #fefefe;
    border-radius: 1rem;
    padding: 0.5rem;
    color: #141417;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    height: 100%;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }

  .card__hero {
    position: relative;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 0.5rem 0.5rem 0 0;
    overflow: hidden;
  }

  .card__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card__hero-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card__rating {
    background: rgba(255, 255, 255, 0.9);
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    color: #333;
  }

  .card__icon {
    background: rgba(255, 255, 255, 0.9);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .favorite-icon {
    font-size: 1.2rem;
    color: #666;
  }

  .favorite-icon.filled {
    color: #e91e63;
  }

  .card__title {
    color: white;
    font-size: 1.2rem;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .card__footer {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card__description {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card__price {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-top: auto;
  }

  .card__actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
  }

  .cart-item-controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .card__btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .view-btn {
    background-color: #141417;
    color: #fff;

    &:hover {
      background-color: #2a2a2a;
    }
  }

  .cart-btn {
    background-color: #4CAF50;
    color: #fff;

    &:hover {
      background-color: #43A047;
    }
  }

  .remove-btn {
    background-color: #dc3545;
    color: #fff;
    width: 100%;

    &:hover {
      background-color: #c82333;
    }
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    justify-content: center;
  }

  .quantity-btn {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid #ddd;
    background: #f8f9fa;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    font-weight: 500;

    &:hover {
      background: #e9ecef;
    }
  }

  .quantity {
    min-width: 2.5rem;
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (max-width: 340px) {
    .card__footer {
      flex-direction: column;
    }

    .card__actions {
      flex-direction: column;
    }
  }
`;

export default Card;
