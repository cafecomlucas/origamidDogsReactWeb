import React from 'react';
import styles from './Image.module.css';

const Image = ({ ...props }) => {
  const [imgLoad, setImgLoad] = React.useState(false);

  const handleImageLoad = React.useCallback(({ target }) => {
    setImgLoad(true);
    target.style.opacity = 1;
  }, []);

  return (
    <div className={styles.imageContainer}>
      {!imgLoad && <div className={styles.imageSkeleton}></div>}
      <img onLoad={handleImageLoad} className={styles.imageEl} {...props} />
    </div>
  );
};

export default Image;
