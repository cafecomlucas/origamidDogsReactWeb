import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST } from '../../api';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

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
      // save token
      console.log(token);
    },
    [username, password],
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
