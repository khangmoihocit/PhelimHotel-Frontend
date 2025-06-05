import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getBookingsByUserId,
  getUser,
} from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    roles: [{ id: "", name: "" }],
  });

  const [bookings, setBookings] = useState([
    {
      id: "",
      room: { id: "", roomType: "" },
      checkInDate: "",
      checkOutDate: "",
      bookingConfirmationCode: "",
    },
  ]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Debug logging
  console.log("Profile - Retrieved userId from localStorage:", userId);
  console.log("Profile - userId type:", typeof userId);
  console.log("Profile - userId looks like email:", userId && userId.includes('@'));
  console.log("Profile - Token present:", token ? "Yes" : "No");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userId, token);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Bạn vẫn muốn xóa tài khoản này. Sau khi xóa không thể khôi phục."
    );
    if (confirmed) {
      await deleteUser(userId)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-danger">{message}</p>}
      {user ? (
        <div
          className="card p-5 mt-5"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h4 className="card-title text-center">Thông tin người dùng</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <img
                        src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          ID:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.id}</p>
                        </div>
                      </div>
                      <hr />


                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Họ và tên
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.lastName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Email:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.email}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Quyền:
                        </label>                        <div className="col-md-10">
                          <ul className="list-unstyled">
                            {user && user.roles && user.roles.length > 0 ? (
                              user.roles.map((role) => (
                                <li key={role.id} className="card-text">
                                  {role.name}
                                </li>
                              ))
                            ) : (
                              <li className="card-text">Không có quyền được gán</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="card-title text-center">Lịch sử đặt phòng</h4>

              {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                  <thead>
                    <tr>
                      <th scope="col">ID đặt phòng</th>
                      <th scope="col">Mã phòng</th>
                      <th scope="col">Loại phòng</th>
                      <th scope="col">Ngày nhận phòng</th>
                      <th scope="col">Ngày trả phòng</th>
                      <th scope="col">Code phòng</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.id}</td>
                        <td>{booking.room.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>
                          {moment(booking.checkInDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>
                          {moment(booking.checkOutDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td className="text-success">On-going</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Bạn chưa thực hiện bất kỳ đặt phòng nào.</p>
              )}

              <div className="d-flex justify-content-center">
                <div className="mx-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDeleteAccount}
                  >
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading dữ liệu người dùng...</p>
      )}
    </div>
  );
};

export default Profile;
