import styles from './PhotoComments.module.css';
import PhotoNewCommentForm from './PhotoNewCommentForm';

const PhotoComments = ({ photoId, comments }) => {
  return (
    <>
      <ul className={styles.commentsList}>
        {comments.map(({ comment_ID, comment_author, comment_content }) => (
          <li key={comment_ID} className={styles.commentItem}>
            <b className={styles.commentAuthor}>{comment_author}: </b>
            <span className={styles.commentContent}>{comment_content}</span>
          </li>
        ))}
      </ul>
      <PhotoNewCommentForm photoId={photoId} />
    </>
  );
};

export default PhotoComments;
