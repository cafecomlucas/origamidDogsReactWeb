import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCirc}>...</div>
    </div>
  );
};

export default Loading;
