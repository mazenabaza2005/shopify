import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.title === product.title);
            
            if (existingItemIndex !== -1) {
                // If item exists, update its quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1
                };
                return updatedCart;
            } else {
                // If item doesn't exist, add it as new with quantity 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productTitle) => {
        setCart(prevCart => prevCart.filter(item => item.title !== productTitle));
    };

    const updateQuantity = (productTitle, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productTitle);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.title === productTitle ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 