import React from 'react';
import PhotosFeed from '../PhotosFeed/PhotosFeed';
import { UserContext } from '../../UserContext';
import Loading from '../../Helpers/Loading';

const AccountPhotosFeed = () => {
  const { userData, rqLoading } = React.useContext(UserContext);

  if (rqLoading) return <Loading />;
  return <>{userData && <PhotosFeed userId={userData.id} />}</>;
};

export default AccountPhotosFeed;
