import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavs = localStorage.getItem('favorites');
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (product) => {
        setFavorites(prevFavs => {
            const isFavorite = prevFavs.some(item => item.title === product.title);
            if (isFavorite) {
                return prevFavs.filter(item => item.title !== product.title);
            }
            return [...prevFavs, product];
        });
    };

    const isFavorite = (productTitle) => {
        return favorites.some(item => item.title === productTitle);
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            toggleFavorite,
            isFavorite,
            clearFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}; 