import React from 'react';
import './AuthInput.css';

const AuthInput = ({ placeholder, handleChange, value, isPassword }) => {
  return (
    <div className="auth-input">
      <input
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default AuthInput;
