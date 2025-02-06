import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';
import Loading from '../../Helpers/Loading';
import styles from './PhotoContent.module.css';
import Image from '../../Helpers/Image';
import { UserContext } from '../../UserContext';
import PhotoDelete from './PhotoDelete';

const PhotoContent = ({ photoId }) => {
  const { request, dataJson, rqLoading } = useFetch();
  const { userData } = React.useContext(UserContext);

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
          <Image src={photo.src} alt={photo.title} />
        </div>
        <div className={styles.photoDetails}>
          <p className={styles.photoAuthor}>
            {userData.username == photo.author ? (
              <PhotoDelete photoId={photo.id} />
            ) : (
              <Link to="#">@{photo.author}</Link>
            )}
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
