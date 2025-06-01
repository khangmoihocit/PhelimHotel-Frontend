import React from 'react';

const LoadingSpinner = ({ text = "Đang tải..." }) => {
  return (
    <div className="loading-state">
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
