import React from 'react';
import PhotoModal from './PhotosFeed/PhotoModal';
import PhotosFeed from './PhotosFeed/PhotosFeed';

const Home = () => {
  const [photoId, setPhotoId] = React.useState(null);

  return (
    <section className="container mainContainer">
      {photoId && <PhotoModal photoId={photoId} setPhotoId={setPhotoId} />}
      <PhotosFeed setPhotoId={setPhotoId} />
    </section>
  );
};

export default Home;
