import React, { useEffect, useRef, useState } from 'react';
import './AuthPage.css';

import AuthForm from '../../components/AuthForm';

const AuthPage = ({ login }) => {
  const [username, setUsername] = useState('example@example.com');
  const [password, setPassword] = useState('example');
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ username, password });
  }

  return (
    <div className="auth-page">
      <div className="auth-page-block">
        <AuthForm
          handleUsername={handleUsername}
          username={username}
          handlePassword={handlePassword}
          password={password}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AuthPage;
