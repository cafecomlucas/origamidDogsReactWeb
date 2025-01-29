import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginNewUser from './LoginNewUser';
import LoginRecoveryPassword from './LoginRecoveryPassword';
import LoginResetPassword from './LoginResetPassword';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css';

const Login = () => {
  const { isUserLoggedIn } = React.useContext(UserContext);

  if (isUserLoggedIn) return <Navigate to="/account" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="new" element={<LoginNewUser />} />
          <Route path="recovery-password" element={<LoginRecoveryPassword />} />
          <Route path="reset-password" element={<LoginResetPassword />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
