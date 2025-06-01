import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data.slice(0, 8)); // Limit to 8 rooms for better display
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải phòng...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="alert alert-danger text-center">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Không thể tải dữ liệu phòng: {errorMessage}
      </div>
    );
  }
  if (!rooms.length) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-bed fa-3x text-muted mb-3"></i>
        <p className="text-muted">Không có phòng nào để hiển thị</p>
      </div>
    );
  }

  return (
    <Container className="room-carousel-container">
      <Carousel 
        indicators={true}
        controls={true}
        interval={4000}
        className="room-carousel"
      >
        {[...Array(Math.ceil(rooms.length / 3))].map((_, index) => (
          <Carousel.Item key={index} className="carousel-item-custom">
            <Row className="g-4 justify-content-center">
              {rooms.slice(index * 3, index * 3 + 3).map((room) => (
                <Col key={room.id} lg={4} md={6} xs={12}>
                  <Card className="room-card featured-room-card h-100">
                    <Link to={`/book-room/${room.id}`} className="room-image-container">
                      <img
                        src={
                          room.photo 
                            ? `data:image/jpeg;base64,${room.photo}`
                            : '/placeholder-room.svg'
                        }
                        alt={`${room.roomType} room`}
                        className="room-image"
                      />
                      <div className="room-badge">
                        <span className="badge bg-primary">Nổi bật</span>
                      </div>
                    </Link>
                    <Card.Body className="d-flex flex-column">
                      <div className="room-info flex-grow-1">
                        <Card.Title className="room-type mb-2">
                          {room.roomType}
                        </Card.Title>
                        <div className="room-features mb-3">
                          <span className="feature-item">
                            <i className="fas fa-wifi me-1"></i>
                            Free WiFi
                          </span>
                          <span className="feature-item">
                            <i className="fas fa-tv me-1"></i>
                            Smart TV
                          </span>
                          <span className="feature-item">
                            <i className="fas fa-snowflake me-1"></i>
                            AC
                          </span>
                        </div>
                        <div className="room-price mb-3">
                          <span className="price-amount">
                            {new Intl.NumberFormat('vi-VN').format(room.roomPrice)}đ
                          </span>
                          <span className="price-unit">/đêm</span>
                        </div>
                      </div>
                      <div className="room-actions">
                        <Link
                          to={`/book-room/${room.id}`}
                          className="btn btn-hotel w-100"
                        >
                          <i className="fas fa-calendar-check me-2"></i>
                          Đặt Phòng Ngay
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
      
      <div className="text-center mt-4">
        <Link to="/browse-all-rooms" className="btn btn-outline-hotel btn-lg">
          <i className="fas fa-th-large me-2"></i>
          Xem Tất Cả Phòng
        </Link>
      </div>
    </Container>
  );
};

export default RoomCarousel;
