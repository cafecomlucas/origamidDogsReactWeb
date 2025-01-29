import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, isAppLoading, appError } = React.useContext(UserContext);

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      let statusValidateFalse = true;
      statusValidateFalse = !username.validate() || !password.validate();
      if (statusValidateFalse) return null;

      userLogin(username.value, password.value);
    },
    [username, password, userLogin],
  );

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {isAppLoading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {appError && <p style={{ marginTop: '2rem' }}>{appError}</p>}
      </form>
    </section>
  );
};

export default LoginForm;
