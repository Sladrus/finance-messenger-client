import React from 'react';
import './AuthButton.css';

const AuthButton = ({ handleSubmit }) => {
  return (
    <div className="auth-button" onClick={handleSubmit}>
      Войти
    </div>
  );
};

export default AuthButton;
