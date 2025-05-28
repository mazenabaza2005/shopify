import React, { useEffect } from 'react';
import './Slider.css';
import image2 from './images/E-Commerce1.jpg';
import image3 from './images/E-Commerce2.jpeg';
import image4 from './images/E-Commerce4.webp';
import image5 from './images/E-Commerce6.jpg';

const Slider = () => {
    useEffect(() => {
        // Autoplay functionality for the slider in container11
        const images = document.querySelectorAll('.container11 .slider img');
        let currentIndex = 0;

        function showNextImage() {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = 'block';
        }

        const interval = setInterval(showNextImage, 3000); // Change slide every 3 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='container11'>
            <div className='slider-wrapper'>
                <div className='slider'>
                    <img id='first' src={image2} style={{ display: 'block' }} alt="E-Commerce1" />
                    <img id='second' src={image3} style={{ display: 'none' }} alt="E-Commerce2" />
                    <img id='third' src={image4} style={{ display: 'none' }} alt="E-Commerce3" />
                    <img id='fourth' src={image5} style={{ display: 'none' }} alt="E-Commerce4" />
                </div>
                <div className='slider-nav'>
                    <a href='#first'></a>
                    <a href='#second'></a>
                    <a href='#third'></a>
                    <a href='#fourth'></a>
                </div>
            </div>
        </div>
    );
};

export default Slider;