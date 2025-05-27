import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Parallax.css';

const Parallax = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Giảm hiệu ứng parallax để tránh bị lỗi layout
    const parallaxStyle = {
        transform: `translateY(${scrollY * 0.2}px)`
    };return (
        <section className='parallax-section mt-2' style={parallaxStyle}>
            <div className="parallax-overlay"></div>
            <Container className='parallax-content'>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <div className='parallax-text'>
                            <h2 className="parallax-title fade-in-up">
                                Tại Sao Chọn <span className='hotel-color'>Phelim Hotel</span>?
                            </h2>
                            <p className="parallax-description fade-in-up">
                                Với hơn 10 năm kinh nghiệm trong ngành khách sạn, chúng tôi cam kết mang đến 
                                cho bạn những trải nghiệm tuyệt vời nhất với dịch vụ chuyên nghiệp và tận tâm.
                            </p>
                            
                            <div className="parallax-stats">
                                <Row className="g-4">
                                    <Col lg={3} md={6} sm={6}>
                                        <div className="stat-box">
                                            <i className="fas fa-users stat-icon"></i>
                                            <h3 className="stat-number">1000+</h3>
                                            <p className="stat-label">Khách hàng</p>
                                        </div>
                                    </Col>
                                    <Col lg={3} md={6} sm={6}>
                                        <div className="stat-box">
                                            <i className="fas fa-bed stat-icon"></i>
                                            <h3 className="stat-number">50+</h3>
                                            <p className="stat-label">Phòng cao cấp</p>
                                        </div>
                                    </Col>
                                    <Col lg={3} md={6} sm={6}>
                                        <div className="stat-box">
                                            <i className="fas fa-trophy stat-icon"></i>
                                            <h3 className="stat-number">15+</h3>
                                            <p className="stat-label">Giải thưởng</p>
                                        </div>
                                    </Col>
                                    <Col lg={3} md={6} sm={6}>
                                        <div className="stat-box">
                                            <i className="fas fa-clock stat-icon"></i>
                                            <h3 className="stat-number">24/7</h3>
                                            <p className="stat-label">Hỗ trợ</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            
                            <div className="parallax-features">
                                <div className="feature-item fade-in-left">
                                    <i className="fas fa-award feature-icon"></i>
                                    <span className="feature-text">Giải thưởng dịch vụ xuất sắc</span>
                                </div>
                                <div className="feature-item fade-in-up">
                                    <i className="fas fa-star feature-icon"></i>
                                    <span className="feature-text">Đánh giá 5 sao từ khách hàng</span>
                                </div>
                                <div className="feature-item fade-in-right">
                                    <i className="fas fa-map-marker-alt feature-icon"></i>
                                    <span className="feature-text">Vị trí trung tâm thuận tiện</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Parallax;