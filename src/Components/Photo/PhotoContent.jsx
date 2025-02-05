import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';
import styles from './PhotoContent.module.css';

const PhotoContent = ({ photoId }) => {
  const { request, dataJson } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photoId);
    request(url, options);
  }, [request, photoId]);

  return (
    dataJson && (
      <div className={styles.photoContentContainer}>
        <h1 className="title">{dataJson.photo.title}</h1>
        <p>Autor: @{dataJson.photo.author}</p>
        <p>Acessos: {dataJson.photo.acessos}</p>
        <p>Idade: {dataJson.photo.idade}</p>
        <p>Peso: {dataJson.photo.peso}</p>
      </div>
    )
  );
};

export default PhotoContent;
