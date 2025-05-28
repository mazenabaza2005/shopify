import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import StyledCard from './StyledCard';
import { useFavorites } from '../Context/FavoritesContext';
import styled from 'styled-components';
import './FavPage.css';

const FavPage = () => {
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <StyledFavPage>
            <div className="favorites-header">
                <h1>Your Favorite Products</h1>
                <p className="favorites-subtitle">
                    {favorites.length === 0 
                        ? "Your favorites list is empty. Start adding some products!"
                        : `You have ${favorites.length} favorite ${favorites.length === 1 ? 'product' : 'products'}`
                    }
                </p>
            </div>
            
            <div className="favorites-container">
                {favorites.length === 0 ? (
                    <div className="empty-favorites">
                        <div className="empty-favorites-content">
                            <i className="fas fa-heart-broken"></i>
                            <h2>No Favorites Yet</h2>
                            <p>Start adding products to your favorites list!</p>
                        </div>
                    </div>
                ) : (
                    <Row xs={1} lg={4} md={3} sm={2} className="g-4">
                        {favorites.map((item, index) => (
                            <Col key={index}>
                                <StyledCard
                                    rate={item.rate}
                                    title={item.title}
                                    image={item.image}
                                    description={item.description}
                                    price={item.price}
                                    onClick={() => console.log('Viewing:', item.title)}
                                    onFavToggle={() => toggleFavorite(item)}
                                    isFav={true}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </StyledFavPage>
    );
};

const StyledFavPage = styled.div`
    padding: 2rem 0;
    min-height: calc(100vh - 60px);
    background: linear-gradient(to bottom, #f8f9fa, #ffffff);

    .favorites-header {
        text-align: center;
        margin-bottom: 3rem;
        padding: 0 1rem;

        h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .favorites-subtitle {
            color: #6c757d;
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
        }
    }

    .favorites-container {
        padding: 0 1rem;
    }

    .empty-favorites {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
        text-align: center;
        padding: 2rem;

        .empty-favorites-content {
            i {
                font-size: 4rem;
                color: #e74c3c;
                margin-bottom: 1rem;
            }

            h2 {
                color: #2c3e50;
                margin-bottom: 1rem;
                font-size: 1.8rem;
            }

            p {
                color: #6c757d;
                font-size: 1.1rem;
            }
        }
    }

    @media (max-width: 768px) {
        .favorites-header {
            h1 {
                font-size: 2rem;
            }
        }
    }
`;

export default FavPage;