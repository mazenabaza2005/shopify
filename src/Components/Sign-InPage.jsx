import React, { useState } from 'react';
import styled from 'styled-components';
import './Sign-InPage.css';

const SignInPage = () => {
    // Create a useState to track the data
    const [send, setSend] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSend((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(send); // Logs the current state (email and password)
    };

    return (
        <StyledSignIn>
            <div className="signin-container">
                <div className="signin-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account to continue</p>
                </div>
                
                <div className="signin-form-container">
                    <form onSubmit={handleSubmit} className="signin-form">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={send.email}
                                onChange={handleChange}
                                required
                            />
                            <small className="form-text">We'll never share your email with anyone else.</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={send.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="signin-button">
                            Sign In
                        </button>

                        <div className="signup-link">
                            Don't have an account? <a href="#">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </StyledSignIn>
    );
};

const StyledSignIn = styled.div`
    min-height: calc(100vh - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 2rem 1rem;

    .signin-container {
        width: 100%;
        max-width: 450px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        animation: slideUp 0.5s ease-out;
    }

    .signin-header {
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

    .signin-form-container {
        padding: 2rem;
    }

    .signin-form {
        .form-group {
            margin-bottom: 1.5rem;

            label {
                display: block;
                margin-bottom: 0.5rem;
                color: #2c3e50;
                font-weight: 500;
            }

            input {
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

            .form-text {
                display: block;
                margin-top: 0.5rem;
                color: #6c757d;
                font-size: 0.875rem;
            }
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;

            .remember-me {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                input[type="checkbox"] {
                    width: 18px;
                    height: 18px;
                    accent-color: #4CAF50;
                }

                label {
                    color: #2c3e50;
                    font-size: 0.9rem;
                }
            }

            .forgot-password {
                color: #4CAF50;
                text-decoration: none;
                font-size: 0.9rem;
                transition: color 0.3s ease;

                &:hover {
                    color: #45a049;
                    text-decoration: underline;
                }
            }
        }

        .signin-button {
            width: 100%;
            padding: 0.75rem;
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
                transform: translateY(-1px);
            }

            &:active {
                transform: translateY(0);
            }
        }

        .signup-link {
            text-align: center;
            margin-top: 1.5rem;
            color: #6c757d;
            font-size: 0.9rem;

            a {
                color: #4CAF50;
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;

                &:hover {
                    color: #45a049;
                    text-decoration: underline;
                }
            }
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

    @media (max-width: 480px) {
        .signin-container {
            margin: 1rem;
        }

        .signin-header {
            padding: 1.5rem 1rem 1rem;

            h1 {
                font-size: 1.75rem;
            }
        }

        .signin-form-container {
            padding: 1.5rem;
        }
    }
`;

export default SignInPage;