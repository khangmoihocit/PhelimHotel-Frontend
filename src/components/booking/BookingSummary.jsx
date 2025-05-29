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
  const numOfDays = checkOutDate.diff(checkInDate, "days");  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);
    try {
      await onConfirm(); // Gọi hàm handleBooking từ BookingForm
    } catch (error) {
      setIsProcessingPayment(false);
      // Lỗi sẽ được xử lý trong BookingForm
    }  };

  return (
    <div className="card card-body mt-5">
      <h4>Thông tin đặt phòng</h4>

      {roomInfo && (
        <div className="mb-3">
          <h5>Thông tin phòng</h5>
          <p>
            Loại phòng: <strong>{roomInfo.roomType}</strong>
          </p>
          <p>
            Giá phòng:{" "}
            <strong>
              {roomInfo.roomPrice?.toLocaleString("vi-VN")} VNĐ/đêm
            </strong>
          </p>
        </div>
      )}

      <div className="mb-3">
        <h5>Thông tin khách hàng</h5>
        <p>
          Họ và tên: <strong>{booking.guestName}</strong>
        </p>
        <p>
          Email: <strong>{booking.guestEmail}</strong>
        </p>
      </div>

      <div className="mb-3">
        <h5>Thông tin lưu trú</h5>
        <p>
          Ngày nhận phòng:{" "}
          <strong>{moment(booking.checkInDate).format("DD/MM/YYYY")}</strong>
        </p>
        <p>
          Ngày trả phòng:{" "}
          <strong>{moment(booking.checkOutDate).format("DD/MM/YYYY")}</strong>
        </p>
        <p>
          Số ngày ở: <strong>{numOfDays}</strong>
        </p>
      </div>      <div className="mb-3">
        <h5>Số khách</h5>
        <p>
          Người lớn: <strong>{parseInt(booking.numberOfAdults) || 1}</strong>
        </p>
        <p>
          Trẻ con: <strong>{parseInt(booking.numberOfChildren) || 0}</strong>
        </p>
      </div>
      {payment > 0 ? (
        <>
          <div className="mb-3 p-3 bg-light border rounded">
            <h5>Tổng chi phí</h5>
            <p className="h4 text-primary mb-0">
              {payment.toLocaleString("vi-VN")} VNĐ
            </p>
          </div>          {isFormValid ? (
            <button
              className="btn btn-success btn-lg w-100"
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
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận đặt phòng và thanh toán"
              )}
            </button>
          ) : null}
        </>
      ) : (
        <p className="text-danger">Có lỗi trong thông tin đặt phòng</p>
      )}
    </div>
  );
};

export default BookingSummary;
