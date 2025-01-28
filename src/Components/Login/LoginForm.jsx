import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, GET_USER } from '../../api';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const getUser = React.useCallback(async (token) => {
    const { url, options } = GET_USER(token);
    const response = await fetch(url, options);
    const user = await response.json();
    console.log(user);
    // ... save user ...
  }, []);

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      let statusValidate = true;
      statusValidate = username.validate();
      statusValidate = password.validate();
      if (!statusValidate) return null;

      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });
      const response = await fetch(url, options);
      const { token } = await response.json();
      // get user
      getUser(token);
      // ... save token ...
      // window.localStorage.setItem('token', token);
    },
    [username, password, getUser],
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
