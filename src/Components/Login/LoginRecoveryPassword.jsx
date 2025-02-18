import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import React from 'react';

const LoginRecoveryPassword = () => {
  const username = useForm();

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!username.validate()) return;
    },
    [username],
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
        <Button>Enviar</Button>
      </form>
    </section>
  );
};

export default LoginRecoveryPassword;
