import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import styles from './AccountNewPhoto.module.css';
import useForm from '../../Hooks/useForm';
import useFile from '../../Hooks/useFile';
import React from 'react';

const AccountNewPhoto = () => {
  const nome = useForm();
  const idade = useForm();
  const peso = useForm();
  const imgFile = useFile();

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      let isNotValid = true;
      isNotValid =
        !nome.validate() |
        !idade.validate() |
        !peso.validate() |
        !imgFile.validate();
      console.log('isNotValid', isNotValid);

      console.log(nome.value);
      console.log(idade.value);
      console.log(peso.value);
      console.log(imgFile.value.raw);
      console.log(imgFile.value.preview);
    },
    [nome, idade, peso, imgFile],
  );

  return (
    <section className={`${styles.newPhotoContainer} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" name="nome" type="text" {...nome} />
        <Input label="Idade" name="idade" type="number" {...idade} />
        <Input label="Peso" name="peso" type="number" {...peso} />
        <input
          className={styles.newPhotoFile}
          type="file"
          name="img"
          id="img"
          onChange={imgFile.onChange}
        />
        {imgFile.error && <p>{imgFile.error}</p>}
        <Button>Enviar</Button>
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
