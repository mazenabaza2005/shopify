import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { useCart } from '../Context/CartContext';
import { useFavorites } from '../Context/FavoritesContext';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';

const SearchResults = () => {
    const { addToCart } = useCart();
    const { addToFav } = useFavorites();
    const location = useLocation();
    const navigate = useNavigate();
    const searchText = location.state?.searchText || '';

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://fakestoreapi.com/products`);
                const lowerCaseSearchText = searchText.toLowerCase();
                const filteredResults = response.data.filter(product =>
                    product.title.toLowerCase().includes(lowerCaseSearchText) ||
                    product.description.toLowerCase().includes(lowerCaseSearchText) ||
                    product.category.toLowerCase().includes(lowerCaseSearchText)
                );
                setResults(filteredResults);

            } catch (error) {
                console.error('Error fetching search results:', error);
                setError(error);
                setResults([]); // Clear results on error
            } finally {
                setIsLoading(false);
            }
        };

        // Only fetch if searchText is not empty
        if (searchText) {
            fetchResults();
        } else {
            setResults([]); // Clear results if search text is empty
            setIsLoading(false);
            setError(null);
        }

    }, [searchText]);

    const handleView = (productId) => {
        navigate(`/view/${productId}`);
    };

    return (
        <StyledSearchResults>
            <div className="search-results-container">
                <h2 className="results-heading">Search Results for "{searchText}"</h2>

                {isLoading && (
                    <div className="skeleton-container">
                         {Array(6).fill(0).map((_, index) => (
                            <div key={index} className="skeleton-item-card">
                                <Skeleton variant="rectangular" width={100} height={100} className="skeleton-img" />
                                <div className="skeleton-content">
                                    <Skeleton width="80%" height={20} className="skeleton-title" />
                                    <Skeleton width="60%" height={15} className="skeleton-text" />
                                    <Skeleton width="100%" height={15} className="skeleton-text" />
                                     <Skeleton width="90%" height={15} className="skeleton-text" />
                                     <div className="skeleton-buttons">
                                         <Skeleton variant="rectangular" width={80} height={35} />
                                         <Skeleton variant="rectangular" width={100} height={35} />
                                         <Skeleton variant="circular" width={35} height={35} />
                                     </div>
                                </div>
                            </div>
                         ))}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>Error loading search results. Please try again later.</p>
                    </div>
                )}

                {!isLoading && !error && results.length === 0 && searchText && (
                     <div className="no-results-message">
                         <p>No results found for "{searchText}".</p>
                          <p>Try refining your search terms.</p>
                     </div>
                )}

                {!isLoading && !error && results.length > 0 && (
                    <div className="results-list">
                        {results.map((result) => (
                            <Card key={result.id} className="result-card">
                                <Card.Img variant="top" src={result.image} className="result-image" />
                                <Card.Body className="card-body-content">
                                     <div className="card-title-price">
                                        <Card.Title className="card-title-content">{result.title}</Card.Title>
                                         <div className="card-price">${result.price.toFixed(2)}</div>
                                     </div>
                                    <Card.Header className="card-header-content">{result.category}</Card.Header>
                                    <Card.Text className="card-text-content">
                                        {result.description}
                                    </Card.Text>
                                    <div className="card-buttons">
                                        <Button variant="contained" className="view-button" onClick={() => handleView(result.id)}>View</Button>
                                        <Button variant="contained" className="add-to-cart-button" onClick={() => addToCart(result)}>Add to cart</Button>
                                         <button className="add-to-fav-icon" onClick={() => addToFav(result)}><HeartOutlined /></button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </StyledSearchResults>
    );
};

const StyledSearchResults = styled.div`
    padding: 2rem 1rem;
    min-height: calc(100vh - 80px);
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

    .search-results-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .results-heading {
        text-align: center;
        color: #2c3e50;
        font-size: 2rem;
        margin-bottom: 2rem;
        position: relative;
        padding-bottom: 1rem;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(to right, #4CAF50, #45a049);
            border-radius: 2px;
        }
    }

    .skeleton-container, .results-list {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .skeleton-item-card, .result-card {
        background: white;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }
    }

     .skeleton-item-card {
         flex-direction: row;
         padding: 15px;
         align-items: center;

         .skeleton-img {
             border-radius: 8px;
         }

         .skeleton-content {
             flex-grow: 1;
             padding-left: 15px;

             .skeleton-title {
                 margin-bottom: 10px;
             }

             .skeleton-text {
                 margin-bottom: 8px;
             }

             .skeleton-buttons {
                 display: flex;
                 gap: 10px;
                 margin-top: 15px;
             }
         }
     }

    .result-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        border-bottom-left-radius: 0;
    }

    .card-body-content {
        flex-grow: 1;
        padding: 15px;
        display: flex;
        flex-direction: column;
    }

    .card-header-content {
        background-color: transparent;
        border-bottom: none;
        padding: 0;
        font-size: 0.9rem;
        color: #6c757d;
        margin-bottom: 5px;
    }

    .card-title-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .card-title-content {
        font-size: 1.2rem;
        font-weight: 600;
        color: #343a40;
        margin: 0;
        flex-grow: 1;
        padding-right: 10px;
    }

    .card-text-content {
        font-size: 1rem;
        color: #5a6268;
        line-height: 1.4;
        margin-bottom: 15px;
        flex-grow: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

     .card-price {
         font-size: 1.4rem;
         font-weight: 700;
         color: #4CAF50;
         flex-shrink: 0;
     }

     .card-buttons {
         display: flex;
         gap: 10px;
         margin-top: auto;
         flex-wrap: wrap;
         align-items: center;
     }

     .view-button, .add-to-cart-button, .add-to-fav-button {
         padding: 8px 15px;
         border: none;
         border-radius: 8px;
         font-size: 0.9rem;
         font-weight: 500;
         cursor: pointer;
         transition: all 0.3s ease;
         text-align: center;
     }

      .view-button {
          background: #007bff;
          color: white;

          &:hover {
              background: #0056b3;
              transform: translateY(-2px);
              box-shadow: 0 3px 8px rgba(0, 123, 255, 0.2);
          }
      }

     .add-to-cart-button {
         background: #4CAF50;
         color: white;

         &:hover {
             background: #45a049;
             transform: translateY(-2px);
             box-shadow: 0 3px 8px rgba(76, 175, 80, 0.2);
         }
     }

      .add-to-fav-button {
         background: #e9ecef;
         color: #343a40;

         &:hover {
             background: #dee2e6;
             transform: translateY(-2px);
         }
      }

    .add-to-fav-icon {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
        color: #6c757d;
        transition: color 0.3s ease, transform 0.3s ease;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;

        &:hover {
            color: #dc3545;
            transform: scale(1.2);
        }
    }

      .error-message, .no-results-message {
          text-align: center;
          color: #dc3545;
          font-size: 1.1rem;
          padding: 2rem;
          background-color: #fff3cd;
          border: 1px solid #ffc107;
          border-radius: 10px;
          margin-top: 20px;

          p {
              margin-bottom: 10px;

              &:last-child {
                  margin-bottom: 0;
              }
          }
      }

      .no-results-message {
          color: #6c757d;
          background-color: #e9ecef;
          border-color: #ced4da;
      }

    @media (max-width: 768px) {
        .skeleton-container, .results-list {
            grid-template-columns: 1fr;
        }

        .skeleton-item-card, .result-card {
             flex-direction: column;
        }

        .result-image {
            width: 100%;
            height: 200px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            border-bottom-left-radius: 0;
        }

        .card-body-content {
            padding: 15px;
        }

         .card-title-price {
             flex-direction: column;
             align-items: flex-start;
         }

         .card-price {
             margin-top: 5px;
             font-size: 1.2rem;
         }

         .card-buttons {
             justify-content: center;
             margin-top: 10px;
         }

          .view-button, .add-to-cart-button, .add-to-fav-button {
              width: 100%;
          }

         .add-to-fav-icon {
             width: 40px;
             height: 40px;
             font-size: 1.8rem;
         }
    }

`;

export default SearchResults;