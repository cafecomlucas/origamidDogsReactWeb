import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginNewUser from './LoginNewUser';
import LoginRecoveryPassword from './LoginRecoveryPassword';
import LoginResetPassword from './LoginResetPassword';
import { UserContext } from '../../UserContext';

const Login = () => {
  const { isUserLoggedIn } = React.useContext(UserContext);

  if (isUserLoggedIn) return <Navigate to="/account" />;
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="new" element={<LoginNewUser />} />
        <Route path="recovery-password" element={<LoginRecoveryPassword />} />
        <Route path="reset-password" element={<LoginResetPassword />} />
      </Routes>
    </div>
  );
};

export default Login;
