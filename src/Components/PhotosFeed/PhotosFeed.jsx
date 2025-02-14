import React from 'react';
import { PHOTOS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import PhotoFeedItem from './PhotoFeedItem';
import Loading from '../../Helpers/Loading';
import styles from './PhotosFeed.module.css';

const PhotosFeed = ({
  userId,
  setPhotoId,
  pageNumber = 1,
  setPageLoaded,
  setIsLastPage,
}) => {
  const { request, dataJson, rqLoading } = useFetch();
  const totalItens = 3;

  const getPage = React.useCallback(async () => {
    const { url, options } = PHOTOS_GET({
      page: pageNumber,
      total: totalItens,
      user: userId,
    });
    const { response, resJson } = await request(url, options);
    if (response.ok) {
      if (resJson.length < totalItens) {
        // LAST PAGE
        setIsLastPage(true);
      } else {
        // LOADED
        setPageLoaded(true);
      }
    }
  }, [request, userId, pageNumber, setPageLoaded, setIsLastPage]);

  React.useEffect(() => {
    getPage();
  }, [getPage]);

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
