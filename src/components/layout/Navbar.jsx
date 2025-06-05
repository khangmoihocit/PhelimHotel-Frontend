import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import { useAuth } from "../auth/AuthProvider";
import "./Navbar.css";

const Navbar = () => {  const { user } = useAuth(); // Sử dụng AuthContext
  
  // Get authentication state from AuthContext
  const isLoggedIn = !!user;
  // Check roles properly - could be array or string
  const isAdmin = user?.roles === "ROLE_ADMIN" || (Array.isArray(user?.roles) && user?.roles.includes("ROLE_ADMIN"));




  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top shadow-lg">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          <div className="brand-container">
            <span className="brand-icon">🏨</span>
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
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link nav-link-custom"
                to={"/browse-all-rooms"}
              >
                <span className="nav-icon">🛏️</span>
                Tất Cả Phòng
              </NavLink>
            </li>
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link nav-link-custom"
                  to={"/admin"}
                >
                  <span className="nav-icon">⚙️</span>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to={"/find-booking"}>
                <span className="nav-icon">🔍</span>
                Tìm Đặt Phòng
              </NavLink>
            </li>            {!isLoggedIn ? (
              <li className="nav-item">
                <NavLink className="nav-link nav-link-custom" to={"/login"}>
                  <span className="nav-icon">🔐</span>
                  Đăng Nhập
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link nav-link-custom" to={"/profile"}>
                    <span className="nav-icon">👤</span>
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