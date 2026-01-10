import React from 'react'
import Hero from './components/hero';
import Product from './components/Product';
import Claims from './components/Claims';
import Header from './components/Header';



const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <Product />
            <Claims />

        </>
    )
}

export default Home