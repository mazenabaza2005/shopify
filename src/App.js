import './App.css';
import HomePage from './Components/HomePage';
import NavigationalBar from './Components/NavigationalBar'; 
import SignInPage from './Components/Sign-InPage';
import Slider from './Components/Slider';
import { Routes, Route } from 'react-router-dom';
import CartPage from './Components/CartPage';
import React from 'react';
import FavPage from './Components/FavPage';
import SearchResults from './Components/SearchResults';
import View from './Components/View';
import { CartProvider } from './Context/CartContext';
import { FavoritesProvider } from './Context/FavoritesContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactUs from './Components/ContactUs';
import CheckoutPage from './Components/CheckoutPage';
import InfoPage from './Components/InfoPage';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="App">
          <ToastContainer />
          <NavigationalBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/SignInPage" element={<SignInPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/fav" element={<FavPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/view/:id" element={<View />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/info' element={<InfoPage />} />
            </Routes>
          </main>
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
