import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import PhotoFeedItem from './PhotoFeedItem';
import styles from './PhotosFeed.module.css';

const PhotosFeed = () => {
  const { request, dataJson } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
    request(url, options);
  }, [request]);

  return (
    dataJson && (
      <ul className={`${styles.photosFeed} animeLeft`}>
        {dataJson.map((photoItem) => (
          <PhotoFeedItem key={photoItem.id} {...photoItem} />
        ))}
      </ul>
    )
  );
};

export default PhotosFeed;
