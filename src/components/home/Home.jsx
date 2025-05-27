import React from 'react';
import HeaderMain from '../layout/HeaderMain';
import Parallax from '../common/Parallax';
import HotelService from '../common/HotelService';
import QuickBooking from '../common/QuickBooking';
import { Container, Row, Col } from 'react-bootstrap';
import RoomCarousel from "../common/RoomCarousel";
import TestimonialsSection from './TestimonialsSection';
import GallerySection from './GallerySection';
import NewsletterSection from './NewsletterSection';
import CTASection from './CTASection';
import './Home.css';
import './Testimonials.css';
import './Gallery.css';
import './Newsletter.css';
import './CTA.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <HeaderMain />
            
            {/* Quick Booking Section */}
            <QuickBooking />

            {/* Featured Rooms Section */}
            <section className="featured-rooms-section py-5">
                <Container>
                    <div className="section-header text-center mb-5">
                        <h2 className="section-title">Phòng Nổi Bật</h2>
                        <p className="section-subtitle">Khám phá những phòng đẹp nhất của chúng tôi</p>
                    </div>
                    <RoomCarousel />
                </Container>
            </section>

            {/* Parallax Divider */}
            <Parallax />

            {/* Services Section */}
            <section className="services-section py-5 bg-light">
                <Container>
                    <HotelService />
                </Container>
            </section>

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Gallery Section */}
            <GallerySection />

            {/* Newsletter Section */}
            <NewsletterSection />

            {/* Call to Action Section */}
            <CTASection />
        </div>
    );
};

export default Home;