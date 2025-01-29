import React from 'react';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import Button from '../Forms/Button';

const LoginNewAccount = () => {
  const username = useForm();
  const email = useForm();
  const password = useForm();

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      console.log('username: ', username.value);
      console.log('email: ', email.value);
      console.log('password: ', password.value);
    },
    [username, email, password],
  );

  return (
    <section>
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginNewAccount;
