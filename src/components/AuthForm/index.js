import React from 'react';
import './AuthForm.css';

import AuthInput from '../AuthInput';
import AuthButton from '../AuthButton';

const AuthForm = ({
  handleUsername,
  username,
  handlePassword,
  password,
  handleSubmit,
}) => {
  return (
    <div key="transition-group-content" className="auth-form">
      <img
        className="logo"
        src={
          'https://store-images.s-microsoft.com/image/apps.12376.13537716651231321.3067a421-6c2f-48a9-b77c-1e38e19146e6.f539b24d-6328-4c00-9469-2d6d841667e6'
        }
        alt="logo"
      />
      <span className="auth-form-title">Moneyport Messenger</span>
      <span className="auth-form-subtitle">Введите почту и пароль</span>
      <AuthInput
        placeholder={'Email'}
        handleChange={handleUsername}
        value={username}
        isPassword={false}
      />
      <AuthInput
        placeholder={'Password'}
        handleChange={handlePassword}
        value={password}
        isPassword={true}
      />
      <AuthButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default AuthForm;
