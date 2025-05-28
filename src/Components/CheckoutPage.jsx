import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CreditCardOutlined, ShoppingOutlined, TruckOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        // payment details would go here in a real app
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Checkout form submitted:', formData);
        // In a real application, you would process the order here
        // For now, we'll just log the data and show a toast notification
        toast.success('Order placed successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        // alert('Order Submitted (Placeholder)'); // Removed default alert
        // navigate('/order-confirmation'); // Example navigation after submission
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const subtotal = calculateTotal();
    const shipping = 0; // Assuming free shipping for now
    const total = subtotal + shipping;

    return (
        <StyledCheckoutPage>
            <div className="checkout-container">
                <div className="checkout-header">
                    <h1>Checkout</h1>
                    <p>Please review your order and enter your details.</p>
                </div>

                <div className="checkout-content">
                    <div className="shipping-payment-section">
                        <h2><TruckOutlined /> Shipping Information</h2>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridFullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Full Name" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address1" value={formData.address1} onChange={handleChange} required placeholder="1234 Main St" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Apartment, studio, or floor" />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                     <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control type="text" name="zip" value={formData.zip} onChange={handleChange} required />
                                </Form.Group>
                            </Row>

                             <Form.Group className="mb-3" controlId="formGridCountry">
                                <Form.Label>Country</Form.Label>
                                 <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} required />
                            </Form.Group>

                            <h2><CreditCardOutlined /> Payment Method</h2>
                             <p>Payment integration would go here (e.g., credit card form, PayPal, etc.)</p>
                             {/* Placeholder for payment form */}
                             <div className="payment-placeholder mb-3">
                                 <p>Secure Payment Gateway</p>
                                 {/* Example: <CardElement options={CARD_ELEMENT_OPTIONS} /> */}
                             </div>

                            <Button variant="success" type="submit" className="place-order-button">
                                Place Order
                            </Button>
                        </Form>
                    </div>

                    <div className="order-summary-section">
                        <h2><ShoppingOutlined /> Order Summary</h2>
                        <div className="order-items">
                            {cart.map(item => (
                                <div key={item.id} className="order-item">
                                    <img src={item.image} alt={item.title} className="order-item-image" />
                                    <div className="order-item-details">
                                        <p className="order-item-title">{item.title}</p>
                                        <p className="order-item-quantity">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="order-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                        <div className="order-totals">
                            <div className="total-row"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="total-row"><span>Shipping:</span><span>${shipping.toFixed(2)}</span></div>
                            <div className="total-row total"><span>Order Total:</span><span>${total.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </StyledCheckoutPage>
    );
};

const StyledCheckoutPage = styled.div`
    min-height: calc(100vh - 80px);
    background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .checkout-container {
        width: 100%;
        max-width: 1200px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

     .checkout-header {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(to right, #4CAF50, #45a049);
        color: white;

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        p {
            font-size: 1.1rem;
            opacity: 0.9;
        }
    }

    .checkout-content {
        display: flex;
        flex-wrap: wrap;
        padding: 2rem;
        gap: 3rem;

        .shipping-payment-section {
            flex: 2;
            min-width: 300px;

            h2 {
                color: #2c3e50;
                font-size: 1.8rem;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;

                svg {
                    margin-right: 10px;
                    color: #4CAF50;
                }
            }

            .form-label {
                font-weight: 500;
                color: #343a40;
            }

            .form-control {
                border-radius: 10px;
                padding: 0.75rem 1rem;
                border: 1px solid #ced4da;

                 &:focus {
                    border-color: #4CAF50;
                    box-shadow: 0 0 0 0.2rem rgba(76, 175, 80, 0.25);
                }
            }
             .payment-placeholder {
                 border: 2px dashed #ced4da;
                 border-radius: 10px;
                 padding: 2rem;
                 text-align: center;
                 color: #6c757d;
                 font-size: 1.1rem;
             }
        }

        .order-summary-section {
            flex: 1;
            min-width: 250px;
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1.5rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

             h2 {
                color: #2c3e50;
                font-size: 1.8rem;
                margin-bottom: 1.5rem;
                 display: flex;
                align-items: center;

                svg {
                    margin-right: 10px;
                    color: #4CAF50;
                }
            }

            .order-items {
                border-bottom: 1px solid #e9ecef;
                padding-bottom: 1rem;
                margin-bottom: 1rem;

                .order-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;

                    .order-item-image {
                        width: 60px;
                        height: 60px;
                        object-fit: cover;
                        border-radius: 8px;
                        margin-right: 15px;
                    }

                    .order-item-details {
                        flex-grow: 1;

                        .order-item-title {
                            font-weight: 500;
                            color: #343a40;
                            margin-bottom: 5px;
                        }

                        .order-item-quantity {
                            color: #6c757d;
                            font-size: 0.9rem;
                        }
                    }

                    .order-item-price {
                        font-weight: 600;
                        color: #2c3e50;
                    }
                }
            }

            .order-totals {
                 .total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.8rem;
                    color: #343a40;

                    span:first-child {
                        font-weight: 500;
                    }

                    &.total {
                        border-top: 2px solid #e9ecef;
                        padding-top: 1rem;
                        margin-top: 1rem;
                        font-weight: 700;
                        font-size: 1.3rem;
                        color: #2c3e50;
                    }
                }
            }
        }
    }

    .place-order-button {
        width: 100%;
        padding: 1rem;
        border: none;
        border-radius: 10px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #4CAF50; /* Green background */
        color: white;
        margin-top: 1.5rem;

         &:hover {
            background: #45a049; /* Darker green on hover */
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }
         &:active {
            transform: translateY(0);
        }
    }

    @media (max-width: 992px) {
        .checkout-content {
            flex-direction: column;
            gap: 2rem;
        }

        .shipping-payment-section,
        .order-summary-section {
            flex: auto;
            min-width: unset;
        }
    }

    @media (max-width: 576px) {
        padding: 2rem 0.5rem;

        .checkout-container {
            border-radius: 10px;
        }

        .checkout-header {
            padding: 1.5rem 1rem;

            h1 {
                font-size: 2rem;
            }
             p {
                 font-size: 1rem;
             }
        }

        .checkout-content {
            padding: 1rem;
            gap: 1.5rem;
        }

        .shipping-payment-section h2,
        .order-summary-section h2 {
             font-size: 1.5rem;
        }
         .order-item-details {
             flex-direction: column;
             align-items: flex-start;
         }
         .order-item-price {
             margin-top: 5px;
         }
    }
`;

export default CheckoutPage; 