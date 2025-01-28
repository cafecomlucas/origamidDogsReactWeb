import React from 'react';
import { GET_USER, TOKEN_POST } from './api';

export const ContextUser = React.createContext();

export const ContextStorage = ({ children }) => {
  const [userData, setUserData] = React.useState(null);

  const getUser = React.useCallback(async (token) => {
    const { url, options } = GET_USER(token);
    const response = await fetch(url, options);
    const userRes = await response.json();
    setUserData(userRes);
    console.log('userData: ', userRes);
    // ... save user ...
  }, []);

  const userLogin = async (username, password) => {
    const { url, options } = TOKEN_POST({
      username,
      password,
    });
    const response = await fetch(url, options);
    const { token } = await response.json();
    getUser(token);
    console.log('token: ', token);
  };

  return (
    <ContextUser.Provider value={{ userData, userLogin }}>
      {children}
    </ContextUser.Provider>
  );
};
