import React from 'react';
import { UserContext } from '../../UserContext';
import PhotosFeedModal from '../PhotosFeed/PhotosFeedModal';

const AccountPhotosFeed = () => {
  const { userData } = React.useContext(UserContext);

  if (!userData) return null;
  return userData && <PhotosFeedModal userId={userData.id} />;
};

export default AccountPhotosFeed;
