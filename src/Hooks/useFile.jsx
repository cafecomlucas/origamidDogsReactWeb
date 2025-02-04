import React from 'react';

const useFile = () => {
  const [file, setFile] = React.useState({});
  const [error, setError] = React.useState(null);

  const validate = React.useCallback((raw) => {
    if (!raw) {
      setError('Escolha uma imagem');
      return false;
    }
    setError('');
    return true;
  }, []);

  const onChange = React.useCallback(
    ({ target }) => {
      const targetFile = target.files[0];
      validate(targetFile);
      setFile({
        raw: targetFile,
        preview: URL.createObjectURL(targetFile),
      });
    },
    [validate],
  );

  return {
    value: file,
    error,
    onChange,
    validate: () => validate(file.raw),
  };
};

export default useFile;
