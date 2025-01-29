import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';

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
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {isAppLoading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
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
        {appError && <p style={{ marginTop: '2rem' }}>{appError}</p>}
      </form>
    </section>
  );
};

export default LoginForm;
