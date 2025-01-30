import React from 'react';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext';
import ErrorBox from '../../Helpers/ErrorBox';
import useFetch from '../../Hooks/useFetch';

const LoginNewAccount = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();
  const { userLogin, isAppLoading } = React.useContext(UserContext);
  const { request, rqError, rqLoading } = useFetch();

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      let statusValidateFalse = true;
      statusValidateFalse =
        !username.validate() | !email.validate() | !password.validate();
      if (statusValidateFalse) return null;

      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const { response } = await request(url, options);
      console.log('new account: ', response);
      if (response.ok) userLogin(username.value, password.value);
    },
    [username, email, password, request, userLogin],
  );

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="E-mail" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {rqLoading || isAppLoading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {rqError && <ErrorBox message={rqError} />}
      </form>
    </section>
  );
};

export default LoginNewAccount;
