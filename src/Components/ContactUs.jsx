import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setShowAlert(true);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        setTimeout(() => {
            setShowAlert(false);
        }, 6000);
    };
    

    return (
        <StyledContact>
            <div className="contact-container">
                <div className="contact-header">
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you. Send us a message!</p>
                </div>

                {showAlert && (
                    <Alert 
                        key='success' 
                        variant='success' 
                        className="success-alert"
                    >
                        <i className="fas fa-check-circle"></i>
                        <p>We will contact you as soon as possible</p>
                    </Alert>
                )}

                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-control"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control"
                                placeholder="Enter your email"
                            />
                            <small className="form-text">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                className="form-control"
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Type your message here..."
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </StyledContact>
    );
};

const StyledContact = styled.div`
    min-height: calc(100vh - 60px);
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .contact-container {
        width: 100%;
        max-width: 600px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        animation: slideUp 0.5s ease-out;
    }

    .contact-header {
        text-align: center;
        padding: 2rem 2rem 1rem;
        background: linear-gradient(to right, #4CAF50, #45a049);
        color: white;

        h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
            opacity: 0.9;
        }
    }

    .success-alert {
        margin: 1rem;
        padding: 1rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideDown 0.3s ease-out;

        i {
            font-size: 1.5rem;
        }

        p {
            margin: 0;
            font-size: 1rem;
        }
    }

    .contact-form-container {
        padding: 2rem;
    }

    .contact-form {
        .form-group {
            margin-bottom: 1.5rem;

            label {
                display: block;
                margin-bottom: 0.5rem;
                color: #2c3e50;
                font-weight: 500;
            }

            input, textarea {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 2px solid #e9ecef;
                border-radius: 10px;
                font-size: 1rem;
                transition: all 0.3s ease;

                &:focus {
                    border-color: #4CAF50;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
                }
            }

            textarea {
                resize: vertical;
                min-height: 120px;
            }

            .form-text {
                display: block;
                margin-top: 0.5rem;
                color: #6c757d;
                font-size: 0.875rem;
            }
        }
    }

    .submit-button {
        width: 100%;
        padding: 1rem;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: #45a049;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
        }

        &:active {
            transform: translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 480px) {
        .contact-container {
            margin: 1rem;
        }

        .contact-header {
            padding: 1.5rem 1rem 1rem;

            h1 {
                font-size: 1.75rem;
            }
        }

        .contact-form-container {
            padding: 1.5rem;
        }
    }
`;

export default ContactUs;