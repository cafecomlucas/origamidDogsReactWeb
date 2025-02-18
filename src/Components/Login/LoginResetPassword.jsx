import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import React from 'react';

const LoginResetPassword = () => {
  const password = useForm();

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (!password.validate()) return;
    },
    [password],
  );

  return (
    <section className="animeLeft">
      <h1 className="title">Redefinir senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha:" name="password" type="test" {...password} />
        <Button>Redefinir</Button>
      </form>
    </section>
  );
};

export default LoginResetPassword;
