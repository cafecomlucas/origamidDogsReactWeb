import React from 'react';

const Head = ({ title }) => {
  React.useEffect(() => {
    document.title = `${title} | Dogs App`;
  }, [title]);
};

export default Head;
