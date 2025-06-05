import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top shadow-lg">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          <div className="brand-container">
            <span className="brand-icon"></span>
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
                <span className="nav-icon"></span>
                Tất Cả Phòng
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link nav-link-custom"
                to={"/admin"}
              >
                <span className="nav-icon"></span>
                Admin
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to={"/find-booking"}>
                <span className="nav-icon"></span>
                Tìm Đặt Phòng
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle nav-link-custom ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                <span className="nav-icon"></span>
                Tài Khoản
              </a>
              <ul className={`dropdown-menu dropdown-menu-custom ${showAccount ? "show" : ""}`}
              aria-labelledby="accountDropdown">
                <li>
                  <Link to={"/login"} className="dropdown-item dropdown-item-custom">
                    <span className="dropdown-icon"></span>
                    Đăng Nhập
                  </Link>
                </li>
                <li>
                  <Link to={"/profile"} className="dropdown-item dropdown-item-custom">
                    <span className="dropdown-icon"></span>
                    Hồ Sơ
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link to={"/logout"} className="dropdown-item dropdown-item-custom">
                    <span className="dropdown-icon"></span>
                    Đăng Xuất
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
