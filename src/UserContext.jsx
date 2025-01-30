import React from 'react';
import { GET_USER, TOKEN_POST, TOKEN_VALIDATE_POST } from './api';
import useFetch from './Hooks/useFetch';

export const UserContext = React.createContext();

export const UserContextStorage = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [isAppLoading, setIsAppLoading] = React.useState(false);
  const [appError, setAppError] = React.useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const { rqLoading, request } = useFetch();

  const getUser = React.useCallback(async (token) => {
    const { url, options } = GET_USER(token);
    const { resJson } = await request(url, options);
    console.log('userData: ', resJson);
    setUserData(resJson);
    setIsAppLoading(rqLoading);
    setIsUserLoggedIn(true);
  }, []);

  const userLogin = React.useCallback(
    async (username, password) => {
      setIsAppLoading(true);
      try {
        setAppError(null);
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
        console.log('token: ', token);
        const { localStorage } = window;
        // save token
        localStorage.setItem('token', token);
        getUser(token);
      } catch (err) {
        console.error(err.message);
        setAppError(err.message);
        setIsAppLoading(false);
      }
    },
    [getUser],
  );

  const userLogout = React.useCallback(() => {
    const { localStorage } = window;
    setUserData(null);
    setIsAppLoading(false);
    setAppError(null);
    setIsUserLoggedIn(false);
    localStorage.removeItem('token');
  }, []);

  const autoLogin = React.useCallback(async () => {
    const { localStorage } = window;
    const token = localStorage.getItem('token');
    if (token) {
      setIsAppLoading(true);
      try {
        const { url, options } = TOKEN_VALIDATE_POST(token);
        const validTokenRes = await fetch(url, options);
        if (!validTokenRes.ok) throw new Error('Token inválido');
        await getUser(token);
      } catch {
        userLogout();
      }
    }
  }, [getUser, userLogout]);

  React.useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return (
    <UserContext.Provider
      value={{
        userData,
        userLogin,
        isAppLoading,
        appError,
        isUserLoggedIn,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
