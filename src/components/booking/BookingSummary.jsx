import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({
  booking,
  payment,
  isFormValid,
  onConfirm,
  roomInfo,
}) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);
    try {
      await onConfirm(); // Gọi hàm handleBooking từ BookingForm
    } catch (error) {
      setIsProcessingPayment(false);
      // Lỗi sẽ được xử lý trong BookingForm
    }
  };
  return (
    <div className="booking-summary-container">
      {" "}
      {/* Room Information Section */}
      {roomInfo && (
        <div className="summary-section room-info-section">
          <h6 className="section-title-small">Thông tin phòng</h6>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Loại phòng:</span>
              <span className="info-value">{roomInfo.roomType}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Giá phòng:</span>
              <span className="info-value price-highlight">
                {roomInfo.roomPrice?.toLocaleString("vi-VN")} VNĐ/đêm
              </span>
            </div>
          </div>
        </div>
      )}{" "}
      {/* Guest Information Section */}
      <div className="summary-section guest-info-section">
        <h6 className="section-title-small">Thông tin khách hàng</h6>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Họ và tên:</span>
            <span className="info-value">{booking.guestFullName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{booking.guestEmail}</span>
          </div>
        </div>
      </div>
      {/* Stay Information Section */}
      <div className="summary-section stay-info-section">
        <h6 className="section-title-small">Thông tin lưu trú</h6>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Ngày nhận phòng:</span>
            <span className="info-value">
              {moment(booking.checkInDate).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Ngày trả phòng:</span>
            <span className="info-value">
              {moment(booking.checkOutDate).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Số ngày ở:</span>
            <span className="info-value nights-highlight">{numOfDays} đêm</span>
          </div>
        </div>
      </div>{" "}      {/* Guest Count Section */}
      <div className="summary-section guest-count-section">
        <h6 className="section-title-small">👥 Số khách</h6>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Tổng số khách:</span>
            <span className="info-value total-guests-highlight">
              {booking.totalNumOfGuest || (parseInt(booking.numberOfAdults) || 1) + (parseInt(booking.numberOfChildren) || 0)} người
            </span>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="info-item">
                <span className="info-label">Người lớn:</span>
                <span className="info-value">
                  {parseInt(booking.numberOfAdults) || 1}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="info-item">
                <span className="info-label">Trẻ em:</span>
                <span className="info-value">
                  {parseInt(booking.numberOfChildren) || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Payment Section */}
      {payment > 0 ? (
        <div className="summary-section payment-section">
          <div className="payment-breakdown">
            <div className="payment-item">
              <span>Giá phòng × {numOfDays} đêm:</span>
              <span>{payment.toLocaleString("vi-VN")} VNĐ</span>
            </div>
            <hr className="payment-divider" />{" "}
            <div className="payment-total">
              <h6 className="section-title-small">Tổng chi phí</h6>
              <h3 className="total-amount">
                {payment.toLocaleString("vi-VN")} VNĐ
              </h3>
            </div>
          </div>

          {isFormValid && (
            <div className="confirm-section">
              <button
                className="btn btn-confirm btn-lg w-100"
                onClick={handleConfirmBooking}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Đang xử lý thanh toán...
                  </>
                ) : (
                  <>
                    <i className="fas fa-credit-card me-2"></i>
                    Xác nhận đặt phòng và thanh toán
                  </>
                )}
              </button>
              <div className="payment-note">
                <small className="text-muted">
                  <i className="fas fa-shield-alt me-1"></i>
                  Thông tin thanh toán được bảo mật an toàn
                </small>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="summary-section error-section">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Có lỗi trong thông tin đặt phòng. Vui lòng kiểm tra lại.
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
