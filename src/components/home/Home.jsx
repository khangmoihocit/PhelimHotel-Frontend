import React from 'react';
import HeaderMain from '../layout/HeaderMain';
import Parallax from '../common/Parallax';
import HotelService from '../common/HotelService';

const Home = () => {
    return (
        <section>
            <HeaderMain />
            <section className='container'>
                <Parallax />
                <HotelService />
                <Parallax />
            </section>
        </section>
    );
};

export default Home;