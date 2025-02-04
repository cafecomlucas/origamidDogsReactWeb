import Input from '../../Components/Forms/Input';
import InputFile from '../../Components/Forms/InputFile';
import Button from '../../Components/Forms/Button';
import styles from './AccountNewPhoto.module.css';
import useForm from '../../Hooks/useForm';
import useFile from '../../Hooks/useFile';
import React from 'react';
import ErrorBox from '../../Helpers/ErrorBox';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../api';

const AccountNewPhoto = () => {
  const nome = useForm();
  const idade = useForm();
  const peso = useForm();
  const imgFile = useFile();
  const { request, rqLoading, rqError } = useFetch();

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();

      let isNotValid = true;
      isNotValid =
        !nome.validate() |
        !idade.validate() |
        !peso.validate() |
        !imgFile.validate();
      if (isNotValid) return;

      const formData = new FormData();
      formData.append('img', imgFile.value.raw);
      formData.append('nome', nome.value);
      formData.append('peso', peso.value);
      formData.append('idade', idade.value);

      const token = window.localStorage.getItem('token');

      const { url, options } = PHOTO_POST(formData, token);
      await request(url, options);
    },
    [nome, idade, peso, imgFile, request],
  );

  return (
    <section className={`${styles.newPhotoContainer} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" name="nome" type="text" {...nome} />
        <Input label="Idade" name="idade" type="number" {...idade} />
        <Input label="Peso" name="peso" type="number" {...peso} />
        <InputFile name="img" {...imgFile} />
        {rqLoading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {rqError && <ErrorBox message={rqError} />}
      </form>
      {imgFile.value.preview && (
        <div
          className={styles.imgPreview}
          style={{ backgroundImage: `url(${imgFile.value.preview})` }}
        ></div>
      )}
    </section>
  );
};

export default AccountNewPhoto;
