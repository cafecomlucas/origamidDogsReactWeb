import React from 'react';
import { GET_USER, TOKEN_POST } from './api';

export const UserContext = React.createContext();

export const UserContextStorage = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [isAppLoading, setIsAppLoading] = React.useState(false);
  const [appError, setAppError] = React.useState(null);

  const getUser = React.useCallback(async (token) => {
    const { url, options } = GET_USER(token);
    const response = await fetch(url, options);
    const userRes = await response.json();
    setUserData(userRes);
    console.log('userData: ', userRes);
    setIsAppLoading(false);
    // ... save user ...
  }, []);

  const userLogin = async (username, password) => {
    setIsAppLoading(true);
    try {
      const { url, options } = TOKEN_POST({
        username,
        password,
      });
      const response = await fetch(url, options);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const { token } = await response.json();
      getUser(token);
      console.log('token: ', token);
    } catch (err) {
      console.error(err.message);
      setAppError(err.message);
      setIsAppLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, userLogin, isAppLoading, appError }}
    >
      {children}
    </UserContext.Provider>
  );
};
