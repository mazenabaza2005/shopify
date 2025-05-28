import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useCart } from '../Context/CartContext';
import StyledCard from './StyledCard';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import './CartPage.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <StyledCartPage>
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Your Shopping Cart</h1>
                    <p className="cart-subtitle">
                        {cart.length === 0 
                            ? "Your cart is empty. Start shopping!"
                            : `You have ${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`
                        }
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-cart-content">
                            <i className="fas fa-shopping-cart"></i>
                            <h2>Your Cart is Empty</h2>
                            <p>Looks like you haven't added any items to your cart yet.</p>
                            <button 
                                className="continue-shopping"
                                onClick={() => navigate('/')}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            <Row xs={1} lg={4} md={3} sm={2} className="g-4">
                                {cart.map((item) => (
                                    <Col key={item.title}>
                                        <StyledCard
                                            rate={item.rate}
                                            title={item.title}
                                            image={item.image}
                                            description={item.description}
                                            price={item.price}
                                            quantity={item.quantity}
                                            onView={() => navigate(`/view/${item.title}`)}
                                            onQuantityChange={(newQuantity) => updateQuantity(item.title, newQuantity)}
                                            onRemove={() => removeFromCart(item.title)}
                                            isCartItem={true}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <div className="cart-summary">
                            <div className="summary-content">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <button 
                                    className="checkout-button"
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to Checkout
                                </button>
                                <button 
                                    className="continue-shopping"
                                    onClick={() => navigate('/')}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </StyledCartPage>
    );
};

const StyledCartPage = styled.div`
    min-height: calc(100vh - 80px);
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    .cart-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .cart-header {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;

        h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .cart-subtitle {
            color: #6c757d;
            font-size: 1.1rem;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(to right, #4CAF50, #45a049);
            border-radius: 2px;
        }
    }

    .empty-cart {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
        text-align: center;
        padding: 2rem;
        flex-grow: 1;

        .empty-cart-content {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;

            i {
                font-size: 4rem;
                color: #4CAF50;
                margin-bottom: 1rem;
                animation: bounce 2s infinite;
            }

            h2 {
                color: #2c3e50;
                margin-bottom: 1rem;
                font-size: 1.8rem;
            }

            p {
                color: #6c757d;
                margin-bottom: 2rem;
            }
        }
    }

    .cart-items {
        margin-bottom: 2rem;
        flex-grow: 1;
    }

    .cart-summary {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        margin: 0 auto;

        .summary-content {
            .summary-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
                color: #2c3e50;
                font-size: 1.1rem;

                &.total {
                    border-top: 2px solid #e9ecef;
                    padding-top: 1rem;
                    margin-top: 1rem;
                    font-weight: 700;
                    font-size: 1.3rem;
                }
            }
        }
    }

    .checkout-button,
    .continue-shopping {
        width: 100%;
        padding: 1rem;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 1rem;
    }

    .checkout-button {
        background: #4CAF50;
        color: white;

        &:hover {
            background: #45a049;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }
    }

    .continue-shopping {
        background: #e9ecef;
        color: #2c3e50;

        &:hover {
            background: #dee2e6;
            transform: translateY(-2px);
        }
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-20px);
        }
        60% {
            transform: translateY(-10px);
        }
    }

    @media (max-width: 768px) {
        .cart-header {
            h1 {
                font-size: 2rem;
            }
        }

        .cart-summary {
            margin: 2rem 1rem;
        }
    }
`;

export default CartPage;