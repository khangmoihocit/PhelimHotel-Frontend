import React from 'react';
import { useAuth } from '../auth/AuthProvider';

const AuthDebugger = () => {
  const { clearAuthData } = useAuth();
  
  const showLocalStorageData = () => {
    console.log("=== LocalStorage Debug ===");
    console.log("userId:", localStorage.getItem("userId"));
    console.log("userRole:", localStorage.getItem("userRole"));
    console.log("token:", localStorage.getItem("token"));
    console.log("========================");
  };
  
  const clearAndShowData = () => {
    clearAuthData();
    showLocalStorageData();
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#f8f9fa',
      border: '1px solid #dee2e6',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999
    }}>
      <h6>Auth Debug</h6>
      <button 
        className="btn btn-sm btn-info me-2" 
        onClick={showLocalStorageData}
      >
        Show Data
      </button>
      <button 
        className="btn btn-sm btn-warning" 
        onClick={clearAndShowData}
      >
        Clear Auth Data
      </button>
      <div style={{ fontSize: '12px', marginTop: '5px' }}>
        Current userId: {localStorage.getItem("userId")}
      </div>
    </div>
  );
};

export default AuthDebugger;
