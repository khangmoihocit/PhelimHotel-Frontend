import React from 'react';

const HeaderMain = () => {
    return (
        <header className='header-banner'>
            <div className="overlay"></div>
            <div className="animated-texts overlay-content">
                <h1>Welcome to <span className='hotel-color'>Phelim Hotel</span></h1>
                <h4>Mang lại trải nghiệm tốt nhất</h4>
            </div>
        </header>
    );
};

export default HeaderMain;