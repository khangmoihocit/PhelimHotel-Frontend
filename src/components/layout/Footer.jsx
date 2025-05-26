import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    let today = new Date();

    return (
        <footer className='footer-custom mt-5'>
            <Container>
                <Row className="py-4">
                    <Col xs={12} md={4} className="mb-3 mb-md-0">
                        <div className="footer-section">
                            <h5 className="footer-title">
                                <span className="footer-icon">🏨</span>
                                Phelim Hotel
                            </h5>
                            <p className="footer-description">
                                Khách sạn sang trọng với dịch vụ tốt nhất, 
                                mang đến cho bạn trải nghiệm nghỉ dưỡng tuyệt vời.
                            </p>
                        </div>
                    </Col>
                    
                    <Col xs={12} md={4} className="mb-3 mb-md-0">
                        <div className="footer-section">
                            <h6 className="footer-subtitle">Liên Hệ</h6>
                            <div className="footer-contact">
                                <p><span className="contact-icon">📍</span> Hợp Thanh, Mỹ Đức, Hà Nội</p>
                                <p><span className="contact-icon">📞</span> (84) 966519641</p>
                                <p><span className="contact-icon">✉️</span> khang567.ht@gmail.com</p>
                            </div>
                        </div>
                    </Col>
                    
                    <Col xs={12} md={4}>
                        <div className="footer-section">
                            <h6 className="footer-subtitle">Theo Dõi Chúng Tôi</h6>
                            <div className="footer-social">
                                <a href="#" className="social-link">
                                    <span className="social-icon">📘</span> Facebook
                                </a>
                                <a href="#" className="social-link">
                                    <span className="social-icon">📷</span> Instagram
                                </a>
                                <a href="#" className="social-link">
                                    <span className="social-icon">🐦</span> Twitter
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <hr className="footer-divider" />
                
                <Row>
                    <Col xs={12} className="text-center">
                        <p className="footer-copyright">
                            &copy; {today.getFullYear()} Phelim Hotel. Tất cả quyền được bảo lưu.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;