import styles from './PhotoFeedItem.module.css';

const PhotoFeedItem = ({ src, title, acessos }) => {
  return (
    <li className={styles.photoItem}>
      <img className={styles.photoImg} src={src} alt={title} />
      <span className={styles.photoViews}>{acessos}</span>
    </li>
  );
};

export default PhotoFeedItem;
