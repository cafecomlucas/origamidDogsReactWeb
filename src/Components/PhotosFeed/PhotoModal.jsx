import PhotoContent from '../Photo/PhotoContent';
import styles from './PhotoModal.module.css';

const PhotoModal = ({ photoId }) => {
  return (
    <section className={styles.modalContainer}>
      <PhotoContent photoId={photoId} />
    </section>
  );
};

export default PhotoModal;
