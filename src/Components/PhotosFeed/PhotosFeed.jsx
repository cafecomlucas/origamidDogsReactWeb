import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import PhotoFeedItem from './PhotoFeedItem';
import Loading from '../../Helpers/Loading';
import styles from './PhotosFeed.module.css';

const PhotosFeed = ({ userId, setPhotoId }) => {
  const { request, dataJson, rqLoading } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: userId });
    request(url, options);
  }, [request, userId]);

  if (rqLoading) return <Loading />;
  return (
    dataJson && (
      <ul className={`${styles.photosFeed} animeLeft`}>
        {dataJson.map((photoItem) => (
          <PhotoFeedItem
            key={photoItem.id}
            setPhotoId={setPhotoId}
            {...photoItem}
          />
        ))}
      </ul>
    )
  );
};

export default PhotosFeed;
