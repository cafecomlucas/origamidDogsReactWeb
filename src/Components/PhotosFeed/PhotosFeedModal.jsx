import React from 'react';
import PhotoModal from './PhotoModal';
import PhotosFeed from './PhotosFeed';

const PhotosFeedModal = ({ userId = 0 }) => {
  const [photoId, setPhotoId] = React.useState(null);

  return (
    <>
      {photoId && <PhotoModal photoId={photoId} setPhotoId={setPhotoId} />}
      <PhotosFeed userId={userId} setPhotoId={setPhotoId} />
    </>
  );
};

export default PhotosFeedModal;
