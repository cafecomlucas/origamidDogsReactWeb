import React from 'react';
import { UserContext } from '../UserContext';

const AppWrapper = ({ children }) => {
  const { isAppLoading } = React.useContext(UserContext);

  return (
    <div className={`appWrapper ${isAppLoading && 'isAppLoading'}`}>
      {children}
    </div>
  );
};

export default AppWrapper;
