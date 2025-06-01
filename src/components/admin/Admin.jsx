import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return (
        <section className='container'>
            <h2>Trang điều khiển admin</h2>
            <hr />
            <Link to={"/existing-rooms"}>Quản lý phòng</Link>
            <hr />
            <Link to={"/existing-bookings"}>Quản lý đặt phòng</Link>
        </section>
    );
};

export default Admin;