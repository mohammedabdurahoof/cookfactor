import React from 'react'


import Header from './Header';
import CartIcon from './CartIcon';
import Banner from './Banner';
import Categories from './Categories';
import Product from './Product';

function Index() {
    return (
        <div className='container'>
            <Header />
            <CartIcon />
            <Banner />
            <Categories />
            <Product />
        </div>
    )
}

export default Index
