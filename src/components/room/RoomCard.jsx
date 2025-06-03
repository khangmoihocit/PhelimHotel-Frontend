import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {



  if (!room || !room.id) {
    return null; 
  }

  return (
    <Col key={room.id} className="mb-4" xs={12} md={6} lg={4}>
      <Card className="h-100 room-card shadow-sm">
        <div className="room-image-container">
          <Link to={`/book-room/${room.id}`}>
            <Card.Img
              variant="top"
              src={
                room.photo &&
                room.photo !== "undefined" &&
                room.photo !== undefined &&
                room.photo.trim() !== ""
                  ? `data:image/jpeg;base64,${room.photo}`
                  : "/placeholder-room.svg"
              }
              alt="Room photo"
              className="room-image"
              onError={(e) => {
                console.log("Image failed to load, using placeholder");
                e.target.src = "/placeholder-room.svg";
              }}
            />
          </Link>
        </div>
        <Card.Body className="d-flex flex-column">
          <div className="room-info mb-3">
            <Card.Title className="hotel-color mb-2 fs-5 fw-bold">
              {room.roomType}
            </Card.Title>
            <Card.Text className="room-price mb-2 fs-4 fw-semibold">
              {room.roomPrice}VNĐ/đêm
            </Card.Text>
            <Card.Text className="text-muted">
              Phòng tiện nghi đầy đủ, phù hợp cho kỳ nghỉ của bạn
            </Card.Text>
          </div>
          <div className="mt-auto">
            <Link
              to={`/book-room/${room.id}`}
              className="btn btn-hotel w-100 py-2 fw-semibold"
            >
              Xem Chi Tiết & Đặt Phòng
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
