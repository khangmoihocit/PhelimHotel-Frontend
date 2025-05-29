import React from "react";
import { useLocation, Link } from "react-router-dom";
import moment from "moment";

const BookingSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;
  const bookingData = location.state?.bookingData;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              {message ? (
                <div>
                  <i
                    className="fas fa-check-circle text-success"
                    style={{ fontSize: "4rem" }}
                  ></i>
                  <h3 className="text-success mt-3">Đặt phòng thành công!</h3>
                  <p className="text-success">
                    <strong>{message}</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <i
                    className="fas fa-times-circle text-danger"
                    style={{ fontSize: "4rem" }}
                  ></i>
                  <h3 className="text-danger mt-3">Lỗi đặt phòng</h3>
                  <p className="text-danger">{error}</p>
                </div>
              )}
              <div className="mt-4">
                <Link to="/" className="btn btn-primary me-2">
                  Về trang chủ
                </Link>
                <Link
                  to="/browse-all-rooms"
                  className="btn btn-outline-primary"
                >
                  Xem thêm phòng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
