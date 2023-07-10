import React from 'react';
import './AuthButton.css';

const AuthButton = ({ children, handleSubmit }) => {
  return (
    <div className="auth-button" onClick={handleSubmit}>
      {children}
    </div>
  );
};

export default AuthButton;
