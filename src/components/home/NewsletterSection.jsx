import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            alert('Đăng ký thành công! Cảm ơn bạn đã đăng ký nhận tin từ Phelim Hotel.');
            setEmail('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <section className="newsletter-section py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} className="text-center">
                        <div className="newsletter-content">
                            <h3 className="newsletter-title mb-3">Đăng Ký Nhận Ưu Đãi</h3>
                            <p className="newsletter-description mb-4">
                                Nhận thông tin về các chương trình khuyến mãi và ưu đãi đặc biệt từ Phelim Hotel
                            </p>
                            <form className="newsletter-form" onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input 
                                        type="email" 
                                        className="form-control newsletter-input" 
                                        placeholder="Nhập email của bạn..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button 
                                        className="btn btn-newsletter" 
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Đang xử lý...' : 'Đăng Ký'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NewsletterSection;
