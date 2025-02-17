import { useParams } from 'react-router-dom';
import PhotoContent from '../Photo/PhotoContent';

const PhotoPage = () => {
  const { photoId } = useParams();

  return (
    <section className="container mainContainer">
      <PhotoContent photoId={photoId} />
    </section>
  );
};

export default PhotoPage;
