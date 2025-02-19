import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import ErrorBox from '../../Helpers/ErrorBox';
import Head from '../../Helpers/Head';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, isAppLoading, appError } = React.useContext(UserContext);

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      let statusValidateFalse = true;
      statusValidateFalse = !username.validate() | !password.validate();
      if (statusValidateFalse) return null;

      userLogin(username.value, password.value);
    },
    [username, password, userLogin],
  );

  return (
    <section className="animeLeft">
      <Head title="Acessar conta" />
      <h1 className="title">Acessar conta</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {isAppLoading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {appError && <ErrorBox message={appError} />}

        <Link
          className={`${styles.linkrecovery}`}
          to="/login/recovery-password"
        >
          Perdeu a senha? Recupere aqui
        </Link>
        <div className={styles.newaccount}>
          <h2 className={styles.subtitle}>Cadastre-se</h2>
          <p className={styles.description}>
            Ainda não possui conta? Cadastre-se no site.
          </p>
          <Link
            className={`${stylesBtn.button} ${styles.linkbutton}`}
            to="/login/new-account"
          >
            Cadastre-se
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
