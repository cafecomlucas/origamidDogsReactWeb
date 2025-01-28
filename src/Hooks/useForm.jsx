import React from 'react';

const useForm = () => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  const validate = (value) => {
    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    }
    setError('');
    return true;
  };

  const onChange = ({ target }) => {
    const { value: lastValue } = target;
    if (error) validate(lastValue);
    setValue(lastValue);
  };

  return {
    value,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
