import React from 'react';
import styles from './PhotoFeedItem.module.css';
import Image from '../../Helpers/Image';

const PhotoFeedItem = ({ src, title, acessos, id, setPhotoId }) => {
  const handlePhotoItemClick = React.useCallback(() => {
    setPhotoId(id);
  }, [id, setPhotoId]);

  return (
    <li className={styles.photoItem} onClick={handlePhotoItemClick}>
      <Image src={src} alt={title} />
      <span className={styles.photoViews}>{acessos}</span>
    </li>
  );
};

export default PhotoFeedItem;
