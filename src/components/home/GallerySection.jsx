import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const GallerySection = () => {
    const galleryItems = [
        {
            id: 1,
            image: "/src/assets/images/services-1.jpg",
            title: "Sảnh Khách Sạn",
            description: "Không gian sang trọng và hiện đại",
            size: "large"
        },
        {
            id: 2,
            image: "/src/assets/images/services4.jpg",
            title: "Phòng Deluxe",
            size: "normal"
        },
        {
            id: 3,
            image: "/src/assets/images/parrall.jpg",
            title: "Nhà Hàng",
            size: "normal"
        },
        {
            id: 4,
            image: "/src/assets/images/services-1.jpg",
            title: "Hồ Bơi",
            size: "normal"
        },
        {
            id: 5,
            image: "/src/assets/images/services4.jpg",
            title: "Spa",
            size: "normal"
        },
        {
            id: 6,
            image: "/src/assets/images/parrall.jpg",
            title: "View Thành Phố",
            description: "Tầm nhìn tuyệt đẹp từ khách sạn",
            size: "large"
        }
    ];

    return (
        <section className="gallery-section py-5 bg-light">
            <Container>
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">Thư Viện Ảnh</h2>
                    <p className="section-subtitle">Khám phá không gian và tiện nghi tại Phelim Hotel</p>
                </div>
                <Row className="gallery-grid g-3">
                    {galleryItems.map(item => (
                        <Col 
                            lg={item.size === 'large' ? 6 : 3} 
                            md={6} 
                            key={item.id}
                        >
                            <div className={`gallery-item ${item.size}`}>
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="gallery-image" 
                                />
                                <div className="gallery-overlay">
                                    {item.size === 'large' ? (
                                        <>
                                            <h5>{item.title}</h5>
                                            {item.description && <p>{item.description}</p>}
                                        </>
                                    ) : (
                                        <h6>{item.title}</h6>
                                    )}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default GallerySection;
