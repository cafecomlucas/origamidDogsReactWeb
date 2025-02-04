import React from 'react';

const useFile = () => {
  const [file, setFile] = React.useState({});
  const [error, setError] = React.useState(null);

  const onChange = React.useCallback(({ target }) => {
    const targetFile = target.files[0];
    setFile({
      raw: targetFile,
      preview: URL.createObjectURL(targetFile),
    });
  }, []);

  const validate = React.useCallback(() => {
    if (!file.raw) {
      setError('Escolha uma imagem');
      return false;
    }
    setError('');
    return true;
  }, [file]);

  return {
    value: file,
    error,
    onChange,
    validate,
  };
};

export default useFile;
