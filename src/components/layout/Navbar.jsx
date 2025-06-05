import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import { useAuth } from "../auth/AuthProvider";
import "./Navbar.css";
import { 
  FaHotel, 
  FaBed, 
  FaCog, 
  FaSearch, 
  FaSignInAlt, 
  FaUser 
} from "react-icons/fa";

const Navbar = () => {
  const { user, isLoading } = useAuth(); // Sử dụng AuthContext
  
  const isLoggedIn = !!user;
  const isAdmin = user?.roles === "ROLE_ADMIN" || (Array.isArray(user?.roles) && user?.roles.includes("ROLE_ADMIN"));
  if (isLoading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top shadow-lg">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <div className="brand-container">
              <FaHotel className="brand-icon" />
              <span className="brand-text">Phelim Hotel</span>
            </div>
          </Link>
          <div className="navbar-nav ms-auto">
            <span className="nav-link">Đang tải...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top shadow-lg">      <div className="container">
        <Link to={"/"} className="navbar-brand">
          <div className="brand-container">
            <FaHotel className="brand-icon" />
            <span className="brand-text">Phelim Hotel</span>
          </div>
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0">            <li className="nav-item">
              <NavLink
                className="nav-link nav-link-custom"
                to={"/browse-all-rooms"}
              >
                <FaBed className="nav-icon" />
                Tất Cả Phòng
              </NavLink>
            </li>            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link nav-link-custom"
                  to={"/admin"}
                >
                  <FaCog className="nav-icon" />
                  Admin
                </NavLink>
              </li>
            )}</ul>
          
          <ul className="navbar-nav">            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to={"/find-booking"}>
                <FaSearch className="nav-icon" />
                Tìm Đặt Phòng
              </NavLink>
            </li>
              {!isLoggedIn ? (
              <li className="nav-item">
                <NavLink className="nav-link nav-link-custom" to={"/login"}>
                  <FaSignInAlt className="nav-icon" />
                  Đăng Nhập
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link nav-link-custom" to={"/profile"}>
                    <FaUser className="nav-icon" />
                    Hồ Sơ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Logout />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;