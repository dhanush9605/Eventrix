import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedEvents from '../components/FeaturedEvents';
import RoleBasedUtility from '../components/RoleBasedUtility';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <main>
                <Hero />
                <FeaturedEvents />
                <RoleBasedUtility />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
