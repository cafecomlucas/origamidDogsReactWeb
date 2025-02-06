import React from 'react';
import { UserContext } from '../../UserContext';
import Loading from '../../Helpers/Loading';
import PhotosFeedModal from '../PhotosFeed/PhotosFeedModal';

const AccountPhotosFeed = () => {
  const { userData, rqLoading } = React.useContext(UserContext);

  if (rqLoading) return <Loading />;
  return userData && <PhotosFeedModal userId={userData.id} />;
};

export default AccountPhotosFeed;
