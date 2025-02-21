import Head from '../Helpers/Head';
import PhotosFeedModal from './PhotosFeed/PhotosFeedModal';

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Vida de cachorro" />
      <PhotosFeedModal />
    </section>
  );
};

export default Home;
