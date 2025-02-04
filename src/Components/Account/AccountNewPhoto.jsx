import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import styles from './AccountNewPhoto.module.css';
import useForm from '../../Hooks/useForm';
import React from 'react';

const AccountNewPhoto = () => {
  const nome = useForm();
  const idade = useForm();
  const peso = useForm();
  const [imgFile, setImgFile] = React.useState({});

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      let isNotValid = true;
      isNotValid = !nome.validate() | !idade.validate() | !peso.validate();
      console.log('isNotValid', isNotValid);

      console.log(nome.value);
      console.log(idade.value);
      console.log(peso.value);
      console.log(imgFile.raw);
    },
    [nome, idade, peso, imgFile],
  );

  const handleChangeFile = React.useCallback(({ target }) => {
    setImgFile({
      raw: target.files[0],
    });
  }, []);

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
          onChange={handleChangeFile}
        />
        <Button>Enviar</Button>
      </form>
    </section>
  );
};

export default AccountNewPhoto;
