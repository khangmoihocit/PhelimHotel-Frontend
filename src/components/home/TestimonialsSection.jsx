import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const TestimonialsSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Nguyễn Văn An",
            role: "Khách hàng VIP",
            avatar: "N",
            rating: 5,
            text: "Dịch vụ tuyệt vời! Phòng sạch sẽ, nhân viên thân thiện và vị trí rất thuận tiện. Tôi sẽ quay lại đây trong những chuyến du lịch tới."
        },
        {
            id: 2,
            name: "Trần Thị Hoa",
            role: "Du khách",
            avatar: "T",
            rating: 5,
            text: "Khách sạn có view đẹp, đồ ăn ngon và đặc biệt là dịch vụ spa rất chuyên nghiệp. Một trải nghiệm nghỉ dưỡng đáng nhớ!"
        },
        {
            id: 3,
            name: "Lê Minh Đức",
            role: "Doanh nhân",
            avatar: "L",
            rating: 5,
            text: "Tổ chức sự kiện công ty tại đây rất thành công. Không gian đẹp, trang thiết bị hiện đại và đội ngũ hỗ trợ tận tình."
        }
    ];

    return (
        <section className="testimonials-section py-5">
            <Container>
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Khách Hàng Nói Gì Về Chúng Tôi</h2>
                    <p className="section-subtitle">Những đánh giá chân thực từ khách hàng đã trải nghiệm dịch vụ</p>
                </div>
                <Row className="g-4">
                    {testimonials.map(testimonial => (
                        <Col lg={4} md={6} key={testimonial.id}>
                            <div className="testimonial-card">
                                <div className="testimonial-content">
                                    <div className="stars mb-3">
                                        <span>{'⭐'.repeat(testimonial.rating)}</span>
                                    </div>
                                    <p className="testimonial-text">
                                        {testimonial.text}
                                    </p>
                                    <div className="testimonial-author">
                                        <div className="author-avatar">
                                            <span>{testimonial.avatar}</span>
                                        </div>
                                        <div className="author-info">
                                            <h6>{testimonial.name}</h6>
                                            <small>{testimonial.role}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TestimonialsSection;
