import React from 'react';
import { GET_USER, TOKEN_POST, TOKEN_VALIDATE_POST } from './api';
import useFetch from './Hooks/useFetch';

export const UserContext = React.createContext();

export const UserContextStorage = ({ children }) => {
  const [userData, setUserData] = React.useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const { rqLoading, rqError, request } = useFetch();

  const getUser = React.useCallback(
    async (token) => {
      const { url, options } = GET_USER(token);
      const { response, resJson } = await request(url, options);
      if (response.ok) {
        console.log('userData: ', resJson);
        setUserData(resJson);
        setIsUserLoggedIn(true);
      }
    },
    [request],
  );

  const userLogin = React.useCallback(
    async (username, password) => {
      const { url, options } = TOKEN_POST({
        username,
        password,
      });
      const { response, resJson } = await request(url, options);
      if (response.ok) {
        const { token } = resJson;
        console.log('token: ', token);
        const { localStorage } = window;
        // save token
        localStorage.setItem('token', token);
        await getUser(token);
      }
    },
    [request, getUser],
  );

  const userLogout = React.useCallback(() => {
    const { localStorage } = window;
    setUserData(null);
    setIsUserLoggedIn(false);
    localStorage.removeItem('token');
  }, []);

  const autoLogin = React.useCallback(async () => {
    const { localStorage } = window;
    const token = localStorage.getItem('token');
    if (token) {
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
        isAppLoading: rqLoading,
        appError: rqError,
        isUserLoggedIn,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
