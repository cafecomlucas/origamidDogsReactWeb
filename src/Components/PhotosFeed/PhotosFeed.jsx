import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import PhotoFeedItem from './PhotoFeedItem';

const PhotosFeed = () => {
  const { request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });

    request(url, options).then((response) => {
      console.log(response);
    });
  }, [request]);

  return (
    <ul className="animeLeft">
      <PhotoFeedItem />
    </ul>
  );
};

export default PhotosFeed;
