import { useParams } from 'react-router-dom';
import PhotoContent from '../Photo/PhotoContent';
import Head from '../../Helpers/Head';

const PhotoPage = () => {
  const { photoId } = useParams();

  return (
    <section className="container mainContainer">
      <Head title="Detalhes da foto" />
      <PhotoContent photoId={photoId} isPage={true} />
    </section>
  );
};

export default PhotoPage;
