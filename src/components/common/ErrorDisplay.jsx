import React from 'react';

const ErrorDisplay = ({ error }) => {
  return (
    <div className="error-state">
      <div className="error-icon">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <div className="error-content">
        <h4 className="error-title">Oops! Có lỗi xảy ra</h4>
        <p className="error-message">{error}</p>
        <div className="error-actions">
          <button 
            className="btn btn-hotel"
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
