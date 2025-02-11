import React from 'react';
import styles from './PhotoNewCommentForm.module.css';

const PhotoNewCommentForm = () => {
  const [commentText, setCommentText] = React.useState('');

  const handleCommentChange = React.useCallback(({ target }) => {
    setCommentText(target.value);
  }, []);

  return (
    <form className={styles.commentForm}>
      <textarea
        className={styles.commentField}
        placeholder="Comente..."
        id="comment"
        name="comment"
        value={commentText}
        onChange={handleCommentChange}
      ></textarea>
      <button className={styles.commentButton}>Enviar</button>
    </form>
  );
};

export default PhotoNewCommentForm;
