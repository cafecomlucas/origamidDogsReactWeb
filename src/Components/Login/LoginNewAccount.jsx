import React from 'react';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';

const LoginNewAccount = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();
  const { userLogin } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      let statusValidateFalse = true;
      statusValidateFalse =
        !username.validate() | !email.validate() | !password.validate();
      if (statusValidateFalse) return null;
      setIsLoading(true);
      try {
        setError(null);
        const { url, options } = USER_POST({
          username: username.value,
          email: email.value,
          password: password.value,
        });
        const resNewAcc = await fetch(url, options);
        console.log('new account: ', resNewAcc);
        if (!resNewAcc.ok) {
          const { message } = await resNewAcc.json();
          throw new Error(message);
        }
        userLogin(username.value, password.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [username, email, password, userLogin],
  );

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {isLoading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {error && <p style={{ marginTop: '2rem' }}>{error}</p>}
      </form>
    </section>
  );
};

export default LoginNewAccount;
