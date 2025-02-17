import { useParams } from 'react-router-dom';
import PhotosFeedModal from '../PhotosFeed/PhotosFeedModal';

const ProfilePage = () => {
  const { userAuthor } = useParams();

  return (
    <section className="container mainContainer">
      <h1 className="title">{userAuthor}'s photos</h1>
      <PhotosFeedModal userId={userAuthor} />;
    </section>
  );
};

export default ProfilePage;
