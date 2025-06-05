import React, { useState } from "react";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import "../../assets/styles/auth.css";
import { FaHotel, FaLock, FaSignInAlt, FaExclamationTriangle, FaEnvelope } from "react-icons/fa";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      // Truyền thông tin user để AuthProvider có thể lưu userName
      auth.handleLogin(token, success);
      navigate(redirectUrl, { replace: true });
    } else {
      setErrorMessage("Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!");
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };
  return (
    <div className="auth-container">      <div className="auth-card">
        <div className="auth-brand">
          <FaHotel className="auth-brand-icon" />
          <div className="auth-brand-text">Phelim Hotel</div>
        </div>
        
        <div className="auth-header">
          <h2 className="auth-title">Đăng Nhập</h2>
          <p className="auth-subtitle">Chào mừng bạn trở lại!</p>
        </div>

        {errorMessage && (
          <div className="auth-alert">
            <FaExclamationTriangle /> {errorMessage}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group-auth with-icon">
            <label htmlFor="email" className="form-label-auth">
              Email
            </label>            <input
              type="email"
              id="email"
              name="email"
              className="form-control-auth with-icon"
              value={login.email}
              onChange={handleInputChange}
              placeholder="Nhập email của bạn"
              required
            />
            <FaEnvelope className="form-icon" />
          </div>

          <div className="form-group-auth with-icon">
            <label htmlFor="password" className="form-label-auth">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control-auth with-icon"
              value={login.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              required
            />
            <FaLock className="form-icon" />
          </div>

          <button type="submit" className="btn-auth">
            <FaSignInAlt /> Đăng nhập
          </button>
        </form>

        <div className="auth-link-container">
          <span className="auth-text">Bạn chưa có tài khoản?</span>
          <Link to="/register" className="auth-link">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;