import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const HeaderMain = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        {
            image: '/src/assets/images/services-1.jpg',
            title: 'Chào mừng đến với Phelim Hotel',
            subtitle: 'Trải nghiệm nghỉ dưỡng đẳng cấp với dịch vụ hoàn hảo'
        },
        {
            image: '/src/assets/images/services4.jpg',
            title: 'Phòng Cao Cấp & Tiện Nghi',
            subtitle: 'Không gian sang trọng với trang thiết bị hiện đại'
        },
        {
            image: '/src/assets/images/parrall.jpg',
            title: 'Dịch Vụ Tuyệt Vời',
            subtitle: 'Đội ngũ chuyên nghiệp phục vụ 24/7'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <header className='hero-section'>
            <div className="hero-slider">
                {slides.map((slide, index) => (
                    <div 
                        key={index}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="hero-overlay"></div>
                    </div>
                ))}
            </div>
            
            <Container className="hero-content">
                <Row className="align-items-center min-vh-100">
                    <Col lg={8} className="mx-auto text-center">                        <div className="hero-text-content">
                            <h1 className="hero-title mb-4">
                                {slides[currentSlide].title}
                                <FaStar className='hero-brand' />
                            </h1>
                            <p className="hero-subtitle mb-4">
                                {slides[currentSlide].subtitle}
                            </p>
                            <div className="hero-stats mb-5">
                                <div className="stat-item">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Khách hàng hài lòng</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Phòng cao cấp</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-label">Dịch vụ hỗ trợ</span>
                                </div>
                            </div>
                            <div className="hero-buttons">
                                <Link to="/browse-all-rooms" className="btn btn-hero-primary me-3">
                                    <i className="fas fa-search me-2"></i>
                                    Khám Phá Phòng
                                </Link>
                                <Link to="#services" className="btn btn-hero-secondary">
                                    <i className="fas fa-concierge-bell me-2"></i>
                                    Xem Dịch Vụ
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            
            {/* Slider indicators */}
            <div className="hero-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
            
            <div className="hero-scroll-indicator">
                <div className="scroll-arrow"></div>
                <span className="scroll-text">Cuộn xuống</span>
            </div>
        </header>
    );
};

export default HeaderMain;