import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaClock, FaUtensils, FaWifi, FaCar, FaSwimmingPool, FaDumbbell, FaConciergeBell, FaSpa } from "react-icons/fa";

const HotelService = () => {
  const services = [
    {
      icon: <FaWifi />,
      title: "WiFi Miễn Phí",
      description: "Kết nối internet tốc độ cao trong toàn bộ khách sạn"
    },
    {
      icon: <FaUtensils />,
      title: "Nhà Hàng Cao Cấp",
      description: "Thưởng thức ẩm thực đặc sắc từ đầu bếp chuyên nghiệp"
    },
    {
      icon: <FaClock />,
      title: "Phục Vụ 24/7",
      description: "Lễ tân và dịch vụ chăm sóc khách hàng 24 giờ"
    },
    {
      icon: <FaCar />,
      title: "Đỗ Xe Miễn Phí",
      description: "Bãi đỗ xe rộng rãi và an toàn cho khách hàng"
    },
    {
      icon: <FaSwimmingPool />,
      title: "Hồ Bơi",
      description: "Hồ bơi ngoài trời với view tuyệt đẹp"
    },
    {
      icon: <FaDumbbell />,
      title: "Phòng Gym",
      description: "Trang thiết bị tập luyện hiện đại và chuyên nghiệp"
    },
    {
      icon: <FaConciergeBell />,
      title: "Dịch Vụ Concierge",
      description: "Hỗ trợ đặt tour, vé máy bay và các dịch vụ khác"
    },
    {
      icon: <FaSpa />,
      title: "Spa & Wellness",
      description: "Thư giãn với các liệu pháp spa chuyên nghiệp"
    }
  ];

  return (
    <section id="services" className="services-container">
      <Container>
        <div className="section-header text-center mb-5">
          <h2 className="section-title">Dịch Vụ Của Chúng Tôi</h2>
          <p className="section-subtitle">
            Trải nghiệm những tiện ích tuyệt vời tại <span className="hotel-color">Phelim Hotel</span>
          </p>
        </div>

        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {services.map((service, index) => (
            <Col key={index}>
              <Card className="service-card h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="service-icon mb-3">
                    {service.icon}
                  </div>
                  <Card.Title className="service-title mb-3">
                    {service.title}
                  </Card.Title>
                  <Card.Text className="service-description">
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HotelService;
