import styles from './PhotoContent.module.css';

const PhotoContent = ({ photoId }) => {
  return (
    <div className={styles.photoContentContainer}>
      <h1 className="title">PhotoModal</h1>
      <p>ID: {photoId}</p>
    </div>
  );
};

export default PhotoContent;
