import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';
import Loading from '../../Helpers/Loading';
import styles from './PhotoContent.module.css';

const PhotoContent = ({ photoId }) => {
  const { request, dataJson, rqLoading } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photoId);
    request(url, options);
  }, [request, photoId]);

  if (rqLoading) return <Loading />;
  if (dataJson) {
    const { photo } = dataJson;
    return (
      <div className={styles.photoContentContainer}>
        <div className={styles.photoContentImg}>
          <img src={photo.src} alt={photo.title} />
        </div>
        <div className={styles.photoDetails}>
          <p className={styles.photoAuthor}>
            <Link to="#">@{photo.author}</Link>
            <span className={styles.photoViews}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to="#">{photo.title}</Link>
          </h1>
          <ul className={styles.photoAttributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default PhotoContent;
