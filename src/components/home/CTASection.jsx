import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CTASection = () => {
    return (
        <section className="cta-section py-5">
            <Container>
                <Row className="justify-content-center text-center">
                    <Col lg={8}>
                        <div className="cta-content">
                            <h2 className="cta-title mb-3">Sẵn sàng cho kỳ nghỉ của bạn?</h2>
                            <p className="cta-description mb-4">
                                Đặt phòng ngay hôm nay và tận hưởng dịch vụ tuyệt vời cùng với tiện nghi hiện đại
                            </p>
                            <div className="cta-buttons">
                                <a href="/browse-all-rooms" className="btn btn-hotel btn-lg me-3">
                                    <i className="fas fa-bed me-2"></i>
                                    Xem Tất Cả Phòng
                                </a>
                                <a href="#contact" className="btn btn-outline-hotel btn-lg">
                                    <i className="fas fa-phone me-2"></i>
                                    Liên Hệ Ngay
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CTASection;
