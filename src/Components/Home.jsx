import Head from '../Helpers/Head';
import PhotosFeedModal from './PhotosFeed/PhotosFeedModal';

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Fotos de usuários" />
      <PhotosFeedModal />
    </section>
  );
};

export default Home;
