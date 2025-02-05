import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import PhotoFeedItem from './PhotoFeedItem';
import styles from './PhotosFeed.module.css';

const PhotosFeed = ({ userId = 0, setPhotoId }) => {
  const { request, dataJson } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: userId });
    request(url, options);
  }, [request, userId]);

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
