import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Form, FormControl } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import "../../assets/styles/booking-layout.css";

const BookingForm = ({ roomInfo: propRoomInfo }) => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);

  const currentUser = localStorage.getItem("userId")
  const [booking, setBooking] = useState({
    //request
    guestFullName: "",
    guestEmail: currentUser,
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    totalNumOfGuest: "",
  });
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isSubmitted]);
  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
      setRoomInfo({
        photo: response.photo,
        roomType: response.roomType,
        roomPrice: response.roomPrice,
      });
    } catch (error) {
      setErrorMessage("Không thể lấy thông tin phòng: " + error.message);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedBooking = { ...booking };

    if (name === "numberOfAdults" || name === "numberOfChildren") {
      updatedBooking[name] = parseInt(value) || 0;
    } else {
      updatedBooking[name] = value;
    }

    // Tự động tính totalNumOfGuest khi numberOfAdults hoặc numberOfChildren thay đổi
    if (name === "numberOfAdults" || name === "numberOfChildren") {
      const adults =
        name === "numberOfAdults"
          ? parseInt(value) || 0
          : updatedBooking.numberOfAdults;
      const children =
        name === "numberOfChildren"
          ? parseInt(value) || 0
          : updatedBooking.numberOfChildren;
      updatedBooking.totalNumOfGuest = adults + children;
    }

    setBooking(updatedBooking);
    setErrorMessage("");
  };
  
  useEffect(() => {
    if (propRoomInfo && propRoomInfo.roomPrice) {
      setRoomInfo(propRoomInfo);
      setRoomPrice(propRoomInfo.roomPrice);
    } else {
      getRoomPriceById(roomId);
    }
  }, [roomId, propRoomInfo]);

  // Tính totalNumOfGuest khi component mount
  useEffect(() => {
    const adults = parseInt(booking.numberOfAdults) || 1;
    const children = parseInt(booking.numberOfChildren) || 0;
    setBooking((prev) => ({
      ...prev,
      totalNumOfGuest: adults + children,
    }));
  }, []); // Chỉ chạy 1 lần khi component mount

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days"); //khoảng cách giữa 2 ngày
    const price = roomPrice ? roomPrice : 0;
    return diffInDays * price;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults) || 0;
    const childrenCount = parseInt(booking.numberOfChildren) || 0;
    const totalCount = adultCount + childrenCount;
    if (adultCount < 1) {
      setErrorMessage("Phải có ít nhất 1 người lớn");
      return false;
    }
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    const today = moment().startOf("day");
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);

    if (checkInDate.isBefore(today)) {
      setErrorMessage("Ngày nhận phòng không thể ở quá khứ");
      return false;
    }

    if (!checkOutDate.isAfter(checkInDate)) {
      setErrorMessage("Ngày trả phòng phải sau ngày nhận phòng");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    setIsValidated(true);

    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
      return;
    }

    setIsSubmitted(true);
  };
  const handleBooking = async () => {
    try {
      const numberOfAdults = parseInt(booking.numberOfAdults) || 1;
      const numberOfChildren = parseInt(booking.numberOfChildren) || 0;
      const totalNumOfGuest = numberOfAdults + numberOfChildren;

      const bookingData = {
        ...booking,
        numberOfAdults,
        numberOfChildren,
        totalNumOfGuest,
        totalPayment: calculatePayment(),
        roomPrice: roomInfo.roomPrice,
        numOfDays: moment(booking.checkOutDate).diff(
          moment(booking.checkInDate),
          "days"
        ),
      };

      console.log("Sending booking data:", bookingData); // Debug log

      const confirmationCode = await bookRoom(roomId, bookingData);
      setIsSubmitted(true);
      navigate("/booking-success", {
        state: { message: confirmationCode, bookingData },
      });
    } catch (error) {
      const errorMsg = error.message || "Có lỗi xảy ra khi đặt phòng";
      setErrorMessage(errorMsg);
      navigate("/booking-success", { state: { error: errorMsg } });
    }
  };
  return (
    <div className="booking-form-layout">
      {!isSubmitted ? (
        // Booking Form
        <div className="booking-form-section">
          <div className="card card-body">
            <h4 className="card-title text-center mb-4">Thông tin đặt phòng</h4>
            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="guestFullName">Họ và tên:</Form.Label>
                    <FormControl
                      required
                      type="text"
                      id="guestFullName"
                      name="guestFullName"
                      value={booking.guestFullName}
                      placeholder="Nhập họ và tên"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập họ và tên
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="guestEmail">Email:</Form.Label>
                    <FormControl
                      required
                      type="email"
                      id="guestEmail"
                      name="guestEmail"
                      value={booking.guestEmail}
                      placeholder="Nhập email"
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập email
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <fieldset
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <legend
                  style={{
                    padding: "0 0.5rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Thời gian lưu trú
                </legend>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="checkInDate">
                        Ngày nhận phòng:
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập ngày nhận phòng
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="checkOutDate">
                        Ngày trả phòng:
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập ngày trả phòng
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                {errorMessage && (
                  <p className="error-message text-danger">{errorMessage}</p>
                )}
              </fieldset>

              <fieldset
                style={{
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <legend
                  style={{
                    padding: "0 0.5rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  Số khách
                </legend>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="numberOfAdults">
                        Số người lớn:
                      </Form.Label>
                      <FormControl
                        required
                        type="number"
                        id="numberOfAdults"
                        name="numberOfAdults"
                        value={booking.numberOfAdults}
                        placeholder="1"
                        min={1}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Vui lòng nhập ít nhất 1 người lớn
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="numberOfChildren">
                        Số trẻ nhỏ:
                      </Form.Label>
                      <FormControl
                        type="number"
                        id="numberOfChildren"
                        name="numberOfChildren"
                        value={booking.numberOfChildren}
                        placeholder="0"
                        min={0}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </fieldset>

              <div className="text-center">
                <button type="submit" className="btn btn-hotel btn-lg px-5">
                  Xem thông tin đặt phòng
                </button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        // Full-width BookingSummary
        <div className="booking-summary-fullwidth">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Xác nhận thông tin đặt phòng</h3>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setIsSubmitted(false)}
            >
              ← Quay lại chỉnh sửa
            </button>
          </div>
          <BookingSummary
            booking={booking}
            payment={calculatePayment()}
            isFormValid={isValidated}
            onConfirm={handleBooking}
            roomInfo={roomInfo}
          />
        </div>
      )}
    </div>
  );
};

export default BookingForm;
