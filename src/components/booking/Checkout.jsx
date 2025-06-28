import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import { FaCar, FaTv, FaUtensils, FaWifi } from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorDisplay from "../common/ErrorDisplay";
import "../../assets/styles/checkout-modern.css";

const Checkout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoadding] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoadding(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoadding(true);
        });
    }, 2000);
  }, [roomId]);
  return (
    <div className="checkout-page">
      {/* Header Section */}
      <div className="container">
        <div className="checkout-header">
          <h1 className="checkout-title">Đặt Phòng Khách Sạn</h1>
          <p className="checkout-subtitle">
            Hoàn tất thông tin để xác nhận đặt phòng của bạn. Chúng tôi cam kết
            mang đến trải nghiệm tuyệt vời nhất.
          </p>
        </div>
      </div>{" "}
      {/* Main Content */}
      <div className="container-fluid px-3">
        <div className="row">
          {/* Compact Room Information - Side Panel */}
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="room-info-sidebar">
              {isLoading ? (
                <LoadingSpinner text="Đang tải thông tin phòng..." />
              ) : error ? (
                <ErrorDisplay error={error} />
              ) : (
                <>
                  {/* Compact Room Image */}
                  <div className="room-image-compact">
                    <img
                      src={`data:image/jpg;base64, ${roomInfo.photo}`}
                      alt="Ảnh phòng"
                      className="room-image"
                    />
                    <div className="room-price-badge">
                      {roomInfo.roomPrice?.toLocaleString("vi-VN")} VNĐ/đêm
                    </div>
                  </div>

                  {/* Compact Room Details */}
                  <div className="room-details-compact">
                    <h4 className="room-type-title">{roomInfo.roomType}</h4>

                    {/* Compact Services */}
                    <div className="services-compact">
                      <div className="service-item-compact">
                        <FaWifi className="service-icon" />
                        <span>WiFi miễn phí</span>
                      </div>
                      <div className="service-item-compact">
                        <FaTv className="service-icon" />
                        <span>Netflix Premium</span>
                      </div>
                      <div className="service-item-compact">
                        <FaUtensils className="service-icon" />
                        <span>Ăn sáng buffet</span>
                      </div>
                      <div className="service-item-compact">
                        <FaCar className="service-icon" />
                        <span>Đưa đón</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Full-width Booking Form */}
          <div className="col-lg-8 col-md-12">
            <div className="booking-form-fullwidth">
              <BookingForm roomInfo={roomInfo} />
            </div>
          </div>
        </div>
      </div>
      {/* Related Rooms */}
      <div className="container">
        <div className="related-rooms-section">
          <h3 className="section-title">Khám phá các phòng khác</h3>
          <RoomCarousel />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
