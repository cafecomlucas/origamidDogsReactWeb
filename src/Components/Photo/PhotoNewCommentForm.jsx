import React from 'react';
import styles from './PhotoNewCommentForm.module.css';
import useFetch from '../../Hooks/useFetch';
import ErrorBox from '../../Helpers/ErrorBox';
import { PHOTO_COMMENT_POST } from '../../api';

const PhotoNewCommentForm = ({ photoId }) => {
  const [commentText, setCommentText] = React.useState('');
  const { request, rqError } = useFetch();

  const handleCommentChange = React.useCallback(({ target }) => {
    setCommentText(target.value);
  }, []);

  const handleCommentSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      const token = window.localStorage.getItem('token');
      const { url, options } = PHOTO_COMMENT_POST(
        photoId,
        {
          comment: commentText,
        },
        token,
      );
      const { response } = await request(url, options);
      if (response.ok) {
        // setCommentText('');
      }
    },
    [photoId, commentText, request],
  );

  return (
    <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
      <textarea
        className={styles.commentField}
        placeholder="Comente..."
        id="comment"
        name="comment"
        value={commentText}
        onChange={handleCommentChange}
      ></textarea>
      <button className={styles.commentButton}>Enviar</button>
      {rqError && <ErrorBox message={rqError} />}
    </form>
  );
};

export default PhotoNewCommentForm;
