import React from 'react';
import { UserContext } from '../../UserContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountPhotosFeed from './AccountPhotosFeed';
import AccountStats from './AccountStats';
import AccountNewPhoto from './AccountNewPhoto';
import AccountScreen from './AccountScreen';

const Account = () => {
  const { isUserLoggedIn } = React.useContext(UserContext);

  if (isUserLoggedIn === false) return <Navigate to="/login" />;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AccountScreen title="Minhas Fotos">
            <AccountPhotosFeed />
          </AccountScreen>
        }
      />
      <Route
        path="/new-photo"
        element={
          <AccountScreen title="Adicionar Foto">
            <AccountNewPhoto />
          </AccountScreen>
        }
      />
      <Route
        path="/stats"
        element={
          <AccountScreen title="Estatísticas">
            <AccountStats />
          </AccountScreen>
        }
      />
    </Routes>
  );
};

export default Account;
