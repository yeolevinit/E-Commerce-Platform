import React from 'react'
import Header from '../components/Header';
import Hero from '../components/hero';
import Product from '../components/Product';
import Claims from '../components/Claims';
import Footer from '../components/Footer';
import Review from '../components/Review';



const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <Product />
            <Review />
            <Claims />
            <Footer />

        </>
    )
}

export default Home