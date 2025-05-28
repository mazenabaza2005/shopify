import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const InfoPage = () => {
    const location = useLocation();
    const sectionRefs = useRef({});

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = sectionRefs.current[id];
            if (element) {
                // Adjust scroll position for fixed header
                const yOffset = -80; // Height of your fixed navbar
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            } else {
                 // Fallback to default browser behavior if ref not found immediately
                const fallbackElement = document.getElementById(id);
                if (fallbackElement) {
                    fallbackElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            // Scroll to top if no hash is present
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]);

    const setRef = (id, element) => {
        sectionRefs.current[id] = element;
    };

    return (
        <StyledInfoPage>
            <div className="info-container">
                <div className="info-header">
                    <h1>Information & Policies</h1>
                    <p>Find details about our store, shipping, returns, and common questions.</p>
                </div>

                <section id="shipping-policy" ref={(el) => setRef('shipping-policy', el)} className="info-section">
                    <h2>Shipping Policy</h2>
                    <p>We offer fast and reliable shipping to ensure you receive your order promptly.</p>
                    <p>Orders are typically processed within 1-2 business days.</p>
                    <p>Shipping times vary depending on your location, but generally range from 3-7 business days within the domestic region.</p>
                    <p>We also offer expedited shipping options at an additional cost.</p>
                    <p>You will receive a shipping confirmation email with a tracking number once your order has been dispatched.</p>
                </section>

                <section id="returns-refunds" ref={(el) => setRef('returns-refunds', el)} className="info-section">
                    <h2>Returns & Refunds</h2>
                    <p>Your satisfaction is our priority. If you are not completely happy with your purchase, we offer hassle-free returns.</p>
                    <p>Items can be returned within 30 days of delivery for a full refund or exchange, provided they are in their original condition and packaging.</p>
                    <p>To initiate a return, please contact our customer service team with your order number.</p>
                    <p>Refunds will be processed to the original payment method within 5-10 business days after we receive the returned item.</p>
                    <p>Please note that return shipping costs may apply, unless the item received is faulty or incorrect.</p>
                </section>

                <section id="faq" ref={(el) => setRef('faq', el)} className="info-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-item">
                        <h3>Q: How can I track my order?</h3>
                        <p>A: Once your order is shipped, you will receive an email with a tracking number and a link to track your package.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Q: What payment methods do you accept?</h3>
                        <p>A: We accept major credit cards (Visa, Mastercard, American Express), PayPal, and other secure payment methods.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Q: Can I change or cancel my order after placing it?</h3>
                        <p>A: We process orders quickly, but you may be able to change or cancel within a short window after placing it. Please contact us immediately.</p>
                    </div>
                    <div className="faq-item">
                         <h3>Q: Do you ship internationally?</h3>
                         <p>A: Currently, we primarily ship within [Your Region/Country]. Please contact us for inquiries about international shipping.</p>
                    </div>
                </section>

                <section id="about-us" ref={(el) => setRef('about-us', el)} className="info-section">
                    <h2>About Us</h2>
                    <p>Welcome to Shopify! We are dedicated to providing high-quality products and an exceptional shopping experience.</p>
                    <p>Our mission is to [Your Mission Statement - e.g., offer the latest trends, provide affordable goods, support local artisans].</p>
                    <p>We are committed to [Your Values - e.g., customer satisfaction, sustainable practices, community involvement].</p>
                    <p>Thank you for choosing to shop with us!</p>
                </section>

            </div>
        </StyledInfoPage>
    );
};

const StyledInfoPage = styled.div`
    min-height: calc(100vh - 80px);
    background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .info-container {
        width: 100%;
        max-width: 1000px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        padding-bottom: 2rem; /* Add padding at the bottom */
    }

     .info-header {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(to right, #4CAF50, #45a049);
        color: white;
        margin-bottom: 2rem; /* Add margin below header */

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

    .info-section {
        padding: 2rem;
        border-bottom: 1px solid #e9ecef; /* Separator between sections */

        &:last-child {
            border-bottom: none;
        }

        h2 {
            color: #2c3e50;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            position: relative;
            padding-bottom: 0.5rem;
        }

        h2::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 60px;
            height: 3px;
            background: #4CAF50;
            border-radius: 2px;
        }

        p {
            color: #343a40;
            line-height: 1.6;
            margin-bottom: 1rem;
        }

        .faq-item {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px dashed #ced4da;

            &:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }

            h3 {
                color: #4CAF50;
                font-size: 1.2rem;
                margin-bottom: 0.8rem;
            }

            p {
                margin-bottom: 0;
                color: #5a6268;
            }
        }
    }

    @media (max-width: 768px) {
        padding: 2rem 0.5rem;

        .info-container {
            border-radius: 10px;
        }

        .info-header {
            padding: 1.5rem 1rem;

            h1 {
                font-size: 2rem;
            }
             p {
                 font-size: 1rem;
             }
        }

        .info-section {
            padding: 1.5rem;

            h2 {
                font-size: 1.8rem;
            }
             p {
                 font-size: 0.95rem;
             }
        }

        .faq-item {
            margin-bottom: 1rem;
            padding-bottom: 1rem;

            h3 {
                font-size: 1.1rem;
            }
        }
    }
`;

export default InfoPage; 