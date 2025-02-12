import React from 'react';
import styles from './PhotoNewCommentForm.module.css';
import useFetch from '../../Hooks/useFetch';
import ErrorBox from '../../Helpers/ErrorBox';
import { PHOTO_COMMENT_POST } from '../../api';
import DogBark from '../../Assets/dog-bark.svg?react';

const PhotoNewCommentForm = ({ photoId, setCommentsList }) => {
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
      const { response, resJson } = await request(url, options);
      if (response.ok) {
        setCommentText('');
        setCommentsList((comments) => [...comments, resJson]);
      }
    },
    [photoId, commentText, request, setCommentText, setCommentsList],
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
      <button className={styles.commentButton}>
        <DogBark />
      </button>
      {rqError && <ErrorBox message={rqError} />}
    </form>
  );
};

export default PhotoNewCommentForm;
