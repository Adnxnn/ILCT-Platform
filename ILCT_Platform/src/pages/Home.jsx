// src/containers/Home.jsx

import React from 'react';
import HeroSection from '../containers/HeroSection';
import HowItWorks from '../containers/HowItWorks';
import Features from '../containers/Features';
import About from '../containers/About';
import WhatWeOffer from '../containers/WhatWeOffer';
import Footer from '../containers/Footer';

const Home = () => {
    return (
        <>
            <HeroSection />
            <HowItWorks />
            <Features />
            <About />
            <WhatWeOffer />
            <Footer />
        </>
    );
};

export default Home;
