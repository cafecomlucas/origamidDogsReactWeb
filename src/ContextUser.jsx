import React from 'react';

export const ContextUser = React.createContext();

export const ContextStorage = ({ children }) => {
  const [userData] = React.useState({ username: 'Lucas' });

  return (
    <ContextUser.Provider value={{ userData }}>{children}</ContextUser.Provider>
  );
};
