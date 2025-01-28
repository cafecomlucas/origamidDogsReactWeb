import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin } = React.useContext(UserContext);

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      let statusValidate = true;
      statusValidate = username.validate();
      statusValidate = password.validate();
      if (!statusValidate) return null;

      userLogin(username.value, password.value);
    },
    [username, password, userLogin],
  );

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
    </section>
  );
};

export default LoginForm;
