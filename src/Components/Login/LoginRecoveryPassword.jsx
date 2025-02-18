import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import React from 'react';
import { PASSWORD_LOST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import ErrorBox from '../../Helpers/ErrorBox';

const LoginRecoveryPassword = () => {
  const username = useForm();
  const { request, rqError, rqLoading } = useFetch();

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (!username.validate()) return;
      const { origin } = window.location;

      const { url, options } = PASSWORD_LOST({
        login: username.value,
        url: `${origin}/login/reset-password`,
      });
      await request(url, options);
    },
    [username, request],
  );

  return (
    <section className="container mainContainer">
      <h1 className="title">Recuperar a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome de usuário (e-mail):"
          name="username"
          type="email"
          {...username}
        />
        {rqLoading ? (
          <Button disabled>Recuperando...</Button>
        ) : (
          <Button>Recuperar</Button>
        )}
        {rqError && <ErrorBox message={rqError} />}
      </form>
    </section>
  );
};

export default LoginRecoveryPassword;
