import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_DELETE } from '../../api';
import styles from './PhotoDelete.module.css';

const PhotoDelete = ({ photoId }) => {
  const { request, rqLoading } = useFetch();
  const navigate = useNavigate();

  const handleDelete = React.useCallback(async () => {
    const confirm = window.confirm('Essa foto será deletada. Confirmar?');
    if (!confirm) return;

    const { localStorage } = window;
    const token = localStorage.getItem('token');

    const { url, options } = PHOTO_DELETE(photoId, token);
    const { response } = await request(url, options);
    if (response.ok) navigate(0);
  }, [photoId, request, navigate]);

  return (
    <>
      {rqLoading ? (
        <button disabled className={styles.btnDelete}>
          Deletando...
        </button>
      ) : (
        <button onClick={handleDelete} className={styles.btnDelete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
