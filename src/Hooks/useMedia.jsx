import React from 'react';

const useMedia = (media) => {
  const [mediaMatch, setMediaMatch] = React.useState();

  const checkMediaMatch = React.useCallback(() => {
    const { matches } = window.matchMedia(media);
    setMediaMatch(matches);
    console.log(matches);
  }, [media]);

  React.useEffect(() => {
    window.addEventListener('resize', checkMediaMatch);
    checkMediaMatch();

    return () => {
      window.removeEventListener('resize', checkMediaMatch);
    };
  }, [checkMediaMatch]);

  return mediaMatch;
};

export default useMedia;
