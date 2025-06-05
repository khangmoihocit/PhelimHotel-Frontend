import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import { useAuth } from "../auth/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0); // Force update trigger
  const { user, userName } = useAuth(); // Sử dụng AuthContext
  
  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Force re-render when authentication state changes
  useEffect(() => {
    // Component sẽ tự động re-render khi user hoặc userName từ AuthContext thay đổi
  }, [user, userName]);

  // Listen for storage changes to force update
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage changed, forcing update");
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab storage changes  
    const handleCustomStorageChange = () => {
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('localStorageChange', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
    };
  }, []);// Get authentication state from AuthContext only
  const isLoggedIn = !!user;
  // Fix: Check roles properly - could be array or string
  const isAdmin = user?.roles === "ROLE_ADMIN" || (Array.isArray(user?.roles) && user?.roles.includes("ROLE_ADMIN"));

  // Get display name for account dropdown
  const getAccountDisplayName = () => {
    if (isLoggedIn && userName) {
      return `Xin chào, ${userName}`;
    }
    return "Tài Khoản";
  };  




  return (
    <nav className={`navbar navbar-expand-lg navbar-custom fixed-top shadow-lg ${scrolled ? 'scrolled' : ''}`}>
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
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to={"/find-booking"}>
                <span className="nav-icon">🔍</span>
                Tìm Đặt Phòng
              </NavLink>
            </li>
            <li className="nav-item dropdown">              <a
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
                <span className="nav-icon">👤</span>
                <span className="account-text">{getAccountDisplayName()}</span>
              </a>
              <ul className={`dropdown-menu dropdown-menu-custom ${showAccount ? "show" : ""}`}
                  aria-labelledby="accountDropdown">
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link to={"/login"} className="dropdown-item dropdown-item-custom">
                        <span className="dropdown-icon">🔐</span>
                        Đăng Nhập
                      </Link>
                    </li>
                    <li>
                      <Link to={"/register"} className="dropdown-item dropdown-item-custom">
                        <span className="dropdown-icon">📝</span>
                        Đăng Ký
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={"/profile"} className="dropdown-item dropdown-item-custom">
                        <span className="dropdown-icon">👤</span>
                        Hồ Sơ
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className="dropdown-item dropdown-item-custom p-0">
                      <Logout />
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;