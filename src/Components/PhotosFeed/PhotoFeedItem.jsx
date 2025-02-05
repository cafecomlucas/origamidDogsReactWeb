import React from 'react';
import styles from './PhotoFeedItem.module.css';

const PhotoFeedItem = ({ src, title, acessos, id, setPhotoId }) => {
  const handlePhotoItemClick = React.useCallback(() => {
    setPhotoId(id);
  }, [id, setPhotoId]);

  return (
    <li className={styles.photoItem} onClick={handlePhotoItemClick}>
      <img className={styles.photoImg} src={src} alt={title} />
      <span className={styles.photoViews}>{acessos}</span>
    </li>
  );
};

export default PhotoFeedItem;
