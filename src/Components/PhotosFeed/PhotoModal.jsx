import React from 'react';
import PhotoContent from '../Photo/PhotoContent';
import styles from './PhotoModal.module.css';

const PhotoModal = ({ photoId, setPhotoId }) => {
  const handleCloseClick = React.useCallback(
    ({ target, currentTarget }) => {
      if (target === currentTarget) setPhotoId(null);
    },
    [setPhotoId],
  );

  return (
    <section className={styles.modalContainer} onClick={handleCloseClick}>
      <PhotoContent photoId={photoId} />
    </section>
  );
};

export default PhotoModal;
