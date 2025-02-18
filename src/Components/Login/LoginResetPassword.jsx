import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import React from 'react';
import { PASSWORD_RESET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import ErrorBox from '../../Helpers/ErrorBox';

const LoginResetPassword = () => {
  const password = useForm();
  const { request, rqLoading, rqError } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (!password.validate()) return;
      const queryParams = new URLSearchParams(window.location.search);

      const { url, options } = PASSWORD_RESET({
        key: queryParams.get('key'),
        login: queryParams.get('login'),
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    },
    [request, password, navigate],
  );

  return (
    <section className="animeLeft">
      <h1 className="title">Redefinir senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Nova Senha:" name="password" type="test" {...password} />
        {rqLoading ? (
          <Button disabled>Redefinindo...</Button>
        ) : (
          <Button>Redefinir</Button>
        )}
        {rqError && <ErrorBox message={rqError} />}
      </form>
    </section>
  );
};

export default LoginResetPassword;
