import React, { useEffect, useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
    }, 3000);
  };
  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4>Reservation Summary</h4>
      <p>
        Họ và tên: <strong>{booking.guestName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Ngày nhận phòng:{" "}
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Ngày trả phòng:{" "}
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Số ngày ở: <strong>{numOfDays}</strong>
      </p>
      <div>
        <h5>Số khách</h5>
        <strong>
          Người lớn: {booking.numberOfAdults}
        </strong>
        <strong>
          Trẻ con: {booking.numberOfChildren}
        </strong>
      </div>
      {payment > 0 ? (
        <>
            <p>Tổng thanh toán: <strong> {payment}VNĐ </strong></p>
            {isFormValid && !isBookingConfirmed ? (
                <button variant="success" onClick={handleConfirmBooking}>
                    {isProcessingPayment ? (
                        <>
                            <span className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Booking confirmed, redirecting to pay ment
                        </>
                    ) : (
                      "Confirm Booking and procesed to payment"
                    )}
                </button>
            ): isBookingConfirmed ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading</span>
                </div>
              </div>
            ) : null}
        </>
      ) : (
        <p className="text-danger"> 
          Ngày trả phòng phải trước ngày đặt phòng
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
