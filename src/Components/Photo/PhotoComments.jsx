import React from 'react';
import styles from './PhotoComments.module.css';
import PhotoNewCommentForm from './PhotoNewCommentForm';
import { UserContext } from '../../UserContext';

const PhotoComments = ({ photoId, comments }) => {
  const [commentsList, setCommentsList] = React.useState(comments);
  const { isUserLoggedIn } = React.useContext(UserContext);
  const commentsListEl = React.useRef(null);

  React.useEffect(() => {
    const { scrollHeight } = commentsListEl.current;
    commentsListEl.current.scrollTop = scrollHeight;
  }, [commentsList]);

  return (
    <>
      <ul ref={commentsListEl} className={styles.commentsList}>
        {commentsList.map(({ comment_ID, comment_author, comment_content }) => (
          <li key={comment_ID} className={styles.commentItem}>
            <span className={styles.commentAuthor}>{comment_author}: </span>
            <span>{comment_content}</span>
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
