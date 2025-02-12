import React from 'react';
import styles from './PhotoComments.module.css';
import PhotoNewCommentForm from './PhotoNewCommentForm';
import { UserContext } from '../../UserContext';

const PhotoComments = ({ photoId, comments }) => {
  const [commentsList, setCommentsList] = React.useState(comments);
  const { isUserLoggedIn } = React.useContext(UserContext);

  return (
    <>
      <ul className={styles.commentsList}>
        {commentsList.map(({ comment_ID, comment_author, comment_content }) => (
          <li key={comment_ID} className={styles.commentItem}>
            <b className={styles.commentAuthor}>{comment_author}: </b>
            <span className={styles.commentContent}>{comment_content}</span>
          </li>
        ))}
      </ul>
      {isUserLoggedIn && (
        <PhotoNewCommentForm
          photoId={photoId}
          setCommentsList={setCommentsList}
        />
      )}
    </>
  );
};

export default PhotoComments;
