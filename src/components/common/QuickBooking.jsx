import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const QuickBooking = () => {
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        guests: '1',
        roomType: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to booking page with search parameters
        const searchParams = new URLSearchParams(formData);
        window.location.href = `/browse-all-rooms?${searchParams.toString()}`;
    };

    // Get today's date for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="quick-booking-section">
            <Container>
                <div className="quick-booking-card">
                    <Row className="align-items-center">
                        <Col lg={3} className="text-center text-lg-start mb-3 mb-lg-0">
                            <h4 className="booking-title">
                                <i className="fas fa-search me-2"></i>
                                Đặt Phòng Nhanh
                            </h4>
                            <p className="booking-subtitle">
                                Tìm phòng phù hợp với bạn
                            </p>
                        </Col>
                        <Col lg={9}>
                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3 align-items-end">
                                    <Col md={3} sm={6}>
                                        <Form.Group>
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-calendar-alt me-1"></i>
                                                Ngày nhận phòng
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="checkInDate"
                                                value={formData.checkInDate}
                                                onChange={handleInputChange}
                                                min={today}
                                                required
                                                className="form-control-custom"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} sm={6}>
                                        <Form.Group>
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-calendar-alt me-1"></i>
                                                Ngày trả phòng
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="checkOutDate"
                                                value={formData.checkOutDate}
                                                onChange={handleInputChange}
                                                min={formData.checkInDate || today}
                                                required
                                                className="form-control-custom"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} sm={6}>
                                        <Form.Group>
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-users me-1"></i>
                                                Khách
                                            </Form.Label>
                                            <Form.Select
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleInputChange}
                                                className="form-control-custom"
                                            >
                                                <option value="1">1 khách</option>
                                                <option value="2">2 khách</option>
                                                <option value="3">3 khách</option>
                                                <option value="4">4 khách</option>
                                                <option value="5">5+ khách</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} sm={6}>
                                        <Form.Group>
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-bed me-1"></i>
                                                Loại phòng
                                            </Form.Label>
                                            <Form.Select
                                                name="roomType"
                                                value={formData.roomType}
                                                onChange={handleInputChange}
                                                className="form-control-custom"
                                            >
                                                <option value="">Tất cả</option>
                                                <option value="Standard">Standard</option>
                                                <option value="Deluxe">Deluxe</option>
                                                <option value="Suite">Suite</option>
                                                <option value="Presidential">Presidential</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} sm={12}>
                                        <Button 
                                            type="submit" 
                                            className="btn-search w-100"
                                        >
                                            <i className="fas fa-search me-2"></i>
                                            Tìm Phòng
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default QuickBooking;
