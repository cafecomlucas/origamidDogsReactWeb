import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginNewAccount from './LoginNewAccount';
import LoginRecoveryPassword from './LoginRecoveryPassword';
import LoginResetPassword from './LoginResetPassword';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css';
import NotFound from '../NotFound';

const Login = () => {
  const { isUserLoggedIn } = React.useContext(UserContext);

  if (isUserLoggedIn) return <Navigate to="/account" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="new-account" element={<LoginNewAccount />} />
          <Route path="recovery-password" element={<LoginRecoveryPassword />} />
          <Route path="reset-password" element={<LoginResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
