import React from 'react';
import { UserContext } from '../../UserContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountPhotosFeed from './AccountPhotosFeed';
import AccountStats from './AccountStats';
import AccountNewPhoto from './AccountNewPhoto';

const Account = () => {
  const { isUserLoggedIn } = React.useContext(UserContext);

  if (isUserLoggedIn === false) return <Navigate to="/login" />;
  return (
    <Routes>
      <Route path="/" element={<AccountPhotosFeed />} />
      <Route path="new-photo" element={<AccountNewPhoto />} />
      <Route path="stats" element={<AccountStats />} />
    </Routes>
  );
};

export default Account;
