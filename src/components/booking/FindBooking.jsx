import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    bookingId: "",
    roomResponse: { id: "" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChidren: "",
    totalNumOfGuest: "",
  });
  const clearBookingInfo = {
    bookingId: "",
    roomResponse: { id: "" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    numOfAdults: "",
    numOfChidren: "",
    totalNumOfGuest: "",
  };

  const [isDeleted, setIsDeleted] = useState(false);
  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!confirmationCode.trim()) {
      setError("Vui lòng nhập mã xác nhận");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
      setError("");
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      setError(error.message || "Có lỗi xảy ra khi tìm kiếm");
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsDeleted(false);
    }, 2000);
  };

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setIsDeleted(true);
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2>Tìm phòng đã đặt</h2>
        <form action="" onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="confirmationCode"
              name="confirmationCode"
              value={confirmationCode}
              onChange={handleInputChange}
              placeholder="Nhập code đặt phòng ở đây"
            />
            <button className="btn btn-hotel input-group-text">Tìm kiếm</button>
          </div>
        </form>
        {isLoading ? (
          <div>Đang tìm kiếm...</div>
        ) : error ? (
          <div className="text-danger">{error}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Thông tin phòng</h3>
            <p>Code đặt phòng: {bookingInfo.bookingConfirmationCode}</p>
            <p>Mã đặt phòng: {bookingInfo.bookingId}</p>
            <p>Mã phòng: {bookingInfo.roomResponse.id}</p>
            <p>Ngày nhận phòng: {bookingInfo.checkInDate}</p>
            <p>Ngày trả phòng: {bookingInfo.checkOutDate}</p>
            <p>Tên người đặt: {bookingInfo.guestFullName}</p>
            <p>Email: {bookingInfo.guestEmail}</p>
            <p>Số người lớn: {bookingInfo.numOfAdults}</p>
            <p>Số trẻ em: {bookingInfo.numOfChidren}</p>
            <p>Tổng người ở: {bookingInfo.totalNumOfGuest}</p>

            {!isDeleted && (
              <button
                className="btn btn-danger"
                onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
              >
                Hủy đặt phòng
              </button>
            )}
          </div>
        ) : (
          <div>Đang tìm phòng...</div>
        )}

        {isDeleted && (
          <div className="alert alert-success mt-3" role="alert">
            Hủy đặt phòng thành công!
          </div>
        )}
      </div>
    </>
  );
};

export default FindBooking;
