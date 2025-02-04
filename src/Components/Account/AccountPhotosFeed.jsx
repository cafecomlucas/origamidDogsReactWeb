import React from 'react';
import PhotosFeed from '../PhotosFeed/PhotosFeed';
import { UserContext } from '../../UserContext';

const AccountPhotosFeed = () => {
  const { userData } = React.useContext(UserContext);

  return <>{userData && <PhotosFeed userId={userData.id} />}</>;
};

export default AccountPhotosFeed;
