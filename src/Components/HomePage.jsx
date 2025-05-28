import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Col, Row, Button, Card } from 'react-bootstrap';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, CarOutlined, DollarOutlined, NodeIndexOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import Slider from './Slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import image31 from './images/Comments2.jpg';
import { TypeAnimation } from 'react-type-animation';
import { Skeleton } from '@mui/material';
import StyledCard from './StyledCard';
import logo1 from './images/logo1.png';
import logo2 from './images/logo2.jpg';
import logo3 from './images/logo3.jpg';
import logo4 from './images/logo4.png';
import logo5 from './images/logo5.jpg';
import logo6 from './images/logo6.jpg';
import logo7 from './images/logo7.png';
import logo8 from './images/logo8.jpg';
import logo9 from './images/logo9.png';
import logo10 from './images/logo10.png';

const HomePage = () => {
    const navigate = useNavigate();
    const productsRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const scrollToProducts = () => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="home-page">
            
            <Slider />

            <section className="products-section" ref={productsRef}>
                <h3 className="section-title">Exclusive Products</h3>
                <div className="container">
                    <Row xs={1} lg={4} md={3} sm={2} className="g-4">
                    {isLoading ? (
                            // Improved skeleton loading
                        Array(8).fill(0).map((_, index) => (
                            <Col key={index}>
                                    <div className="skeleton-card">
                                        <Skeleton 
                                            variant="rectangular" 
                                            width="100%" 
                                            height="200px" 
                                            className="skeleton-image"
                                        />
                                        <div className="skeleton-content">
                                            <Skeleton width="60%" height="24px" className="skeleton-title" />
                                            <Skeleton width="100%" height="16px" className="skeleton-text" />
                                            <Skeleton width="100%" height="16px" className="skeleton-text" />
                                            <Skeleton width="100%" height="16px" className="skeleton-text" />
                                            <Skeleton width="100%" height="40px" className="skeleton-button" />
                                        </div>
                                    </div>
                            </Col>
                        ))
                        ) : error ? (
                            <div className="error-message">
                                <p>Error loading products</p>
                            </div>
                        ) : (
                        products.map(product => (
                            <Col key={product.id}>
                                    <StyledCard
                                        rate={product.rating.rate}
                                        title={product.title}
                                        image={product.image}
                                        description={product.description}
                                        price={product.price}
                                        onView={() => navigate(`/view/${product.id}`)}
                                    />
                            </Col>
                        ))
                    )}
                </Row>
            </div>
            </section>
            
            <section className="brands-section">
                <h3 className="section-title">Our Trusted Brands</h3>
                <div className="brands-slider">
                    <div className="brands-track">
                        <div className="brand-item">
                            <img src={logo1} alt="Brand 1" />
                        </div>
                        <div className="brand-item">
                            <img src={logo2} alt="Brand 2" />
                        </div>
                        <div className="brand-item">
                            <img src={logo3} alt="Brand 3" />
                        </div>
                        <div className="brand-item">
                            <img src={logo4} alt="Brand 4" />
                        </div>
                        <div className="brand-item">
                            <img src={logo6} alt="Brand 5" />
                        </div>
                        <div className="brand-item">
                            <img src={logo7} alt="Brand 6" />
                        </div>
                        <div className="brand-item">
                            <img src={logo8} alt="Brand 7" />
                        </div>
                        <div className="brand-item">
                            <img src={logo9} alt="Brand 8" />
                        </div>
                        <div className="brand-item">
                            <img src={logo10} alt="Brand 9" />
                        </div>
                        {/* Duplicate items for seamless loop */}
                        <div className="brand-item">
                            <img src={logo1} alt="Brand 1" />
                        </div>
                        <div className="brand-item">
                            <img src={logo2} alt="Brand 2" />
                        </div>
                        <div className="brand-item">
                            <img src={logo3} alt="Brand 3" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section">
                <h3 className="section-title">What Our Customers Say</h3>
                <div className="testimonials-container">
                    <div className="testimonials-track">
                        {/* First set of testimonials */}
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"I was hesitant to try a new online store, but I'm so glad I did! The website was super easy to navigate, and my order arrived faster than expected. Plus, the customer service was top-notch when I had a question. Highly recommend!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">SM</div>
                                    <div className="author-info">
                                        <h4>Sarah M.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"Amazing selection and unbeatable prices! I found exactly what I was looking for, and the checkout process was a breeze. I'll definitely be shopping here again."</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">DL</div>
                                    <div className="author-info">
                                        <h4>David L.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                </div>
            </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"The quality of the products I received was excellent, even better than I anticipated. The detailed descriptions and photos really helped me make informed decisions. This is now my go-to online shop!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">EK</div>
                                    <div className="author-info">
                                        <h4>Emily K.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
            </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"I love the personalized recommendations! It's like they know exactly what I need. And the tracking information was super helpful. I always knew where my order was. Fantastic service!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">MB</div>
                                    <div className="author-info">
                                        <h4>Michael B.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"I had a small issue with my order, and the customer support team resolved it immediately. They were incredibly helpful and friendly. I'm impressed with their dedication to customer satisfaction. A truly great shopping experience!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">JP</div>
                                    <div className="author-info">
                                        <h4>Jessica P.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Duplicate set for seamless loop */}
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"I was hesitant to try a new online store, but I'm so glad I did! The website was super easy to navigate, and my order arrived faster than expected. Plus, the customer service was top-notch when I had a question. Highly recommend!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">SM</div>
                                    <div className="author-info">
                                        <h4>Sarah M.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
            </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"Amazing selection and unbeatable prices! I found exactly what I was looking for, and the checkout process was a breeze. I'll definitely be shopping here again."</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">DL</div>
                                    <div className="author-info">
                                        <h4>David L.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"The quality of the products I received was excellent, even better than I anticipated. The detailed descriptions and photos really helped me make informed decisions. This is now my go-to online shop!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">EK</div>
                                    <div className="author-info">
                                        <h4>Emily K.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"I love the personalized recommendations! It's like they know exactly what I need. And the tracking information was super helpful. I always knew where my order was. Fantastic service!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">MB</div>
                                    <div className="author-info">
                                        <h4>Michael B.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="rating">★★★★★</div>
                                <p className="testimonial-text">"I had a small issue with my order, and the customer support team resolved it immediately. They were incredibly helpful and friendly. I'm impressed with their dedication to customer satisfaction. A truly great shopping experience!"</p>
                                <div className="testimonial-author">
                                    <div className="author-avatar">JP</div>
                                    <div className="author-info">
                                        <h4>Jessica P.</h4>
                                        <p>Verified Buyer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h3 className="section-title">Why Choose Us</h3>
                <div className="features-container">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <CarOutlined />
                        </div>
                        <div className="feature-content">
                            <h3>Fast Shipping</h3>
                            <p>Get your orders delivered within 2-3 business days with our premium shipping service</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <DollarOutlined />
                        </div>
                        <div className="feature-content">
                            <h3>Best Prices</h3>
                            <p>Enjoy competitive prices and exclusive deals on all our products</p>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <NodeIndexOutlined />
                        </div>
                        <div className="feature-content">
                            <h3>Real-time Tracking</h3>
                            <p>Track your orders in real-time with our advanced tracking system</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); scrollToProducts(); }}>Products</a></li>
                            <li><Link to="/info#about-us" onClick={scrollToTop}>About Us</Link></li>
                            <li><Link to="/contact" onClick={() => { navigate('/contact'); scrollToTop(); }}>Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><Link to="/info#shipping-policy" onClick={scrollToTop}>Shipping Policy</Link></li>
                            <li><Link to="/info#returns-refunds" onClick={scrollToTop}>Returns & Refunds</Link></li>
                            <li><Link to="/info#faq" onClick={scrollToTop}>FAQ</Link></li>
                            <li><Link to="/info#faq" onClick={scrollToTop}>Track Order</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Connect With Us</h4>
                        <div className="social-links">
                            
                            <a href="https://github.com/mazenabaza2005" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FacebookOutlined />
                            </a>
                            <a href="https://github.com/mazenabaza2005" target="_blank" rel="noopener noreferrer" className="social-link">
                                <TwitterOutlined />
                            </a>
                            <a href="https://github.com/mazenabaza2005" target="_blank" rel="noopener noreferrer" className="social-link">
                                <InstagramOutlined />
                            </a>
                        </div>
                        <div className="newsletter">
                            <h4>Stay Updated</h4>
                            <div className="newsletter-form">
                                <input type="email" placeholder="Enter your email" />
                                <button type="button" className="subscribe-btn">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 M.Abaza, Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;