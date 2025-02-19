import { useParams } from 'react-router-dom';
import PhotosFeedModal from '../PhotosFeed/PhotosFeedModal';
import Head from '../../Helpers/Head';

const ProfilePage = () => {
  const { userAuthor } = useParams();

  return (
    <section className="container mainContainer">
      <Head title={`Fotos de @${userAuthor}`} />
      <h1 className="title">Fotos de @{userAuthor}</h1>
      <PhotosFeedModal userId={userAuthor} />;
    </section>
  );
};

export default ProfilePage;
