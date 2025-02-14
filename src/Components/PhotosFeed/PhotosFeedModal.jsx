import React from 'react';
import PhotoModal from './PhotoModal';
import PhotosFeed from './PhotosFeed';

const PhotosFeedModal = ({ userId = 0 }) => {
  const [photoId, setPhotoId] = React.useState(null);
  const [pageList, setPageList] = React.useState([1]);
  const [isPageLoaded, setPageLoaded] = React.useState(false);
  const [isLastPage, setIsLastPage] = React.useState(false);
  const lastTime = React.useRef(Date.now());

  const checkScroll = React.useCallback(() => {
    // slow down the multiple funcion call by multiple events (wheel/scroll)
    const msLastTime = lastTime.current - Date.now();
    lastTime.current = Date.now();
    if (msLastTime > -200 || isLastPage) return;

    const { offsetHeight } = document.body;
    const { innerHeight, scrollY } = window;
    const heightLimit = (offsetHeight - innerHeight) * 0.75;
    if (scrollY > heightLimit && isPageLoaded) {
      setPageLoaded(false);
      setPageList((pageList) => [...pageList, pageList.length + 1]);
    }
  }, [isPageLoaded, isLastPage]);

  React.useEffect(() => {
    window.addEventListener('wheel', checkScroll);
    window.addEventListener('scroll', checkScroll);
    return () => {
      window.removeEventListener('wheel', checkScroll);
      window.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  return (
    <>
      {photoId && <PhotoModal photoId={photoId} setPhotoId={setPhotoId} />}
      {pageList.map((pageNumber) => (
        <PhotosFeed
          key={pageNumber}
          pageNumber={pageNumber}
          setPageLoaded={setPageLoaded}
          setIsLastPage={setIsLastPage}
          userId={userId}
          setPhotoId={setPhotoId}
        />
      ))}
    </>
  );
};

export default PhotosFeedModal;
