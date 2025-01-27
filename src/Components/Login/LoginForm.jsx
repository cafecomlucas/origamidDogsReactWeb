import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      const response = await fetch(
        'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );
      const { token } = await response.json();
      // save token
    },
    [username, password],
  );

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button>Entrar</Button>
      </form>
    </section>
  );
};

export default LoginForm;
