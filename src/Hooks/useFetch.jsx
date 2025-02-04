import React from 'react';

const useFetch = () => {
  const [rqError, setRqError] = React.useState(null);
  const [rqLoading, setRqLoading] = React.useState(null);
  const [dataJson, setDataJson] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let resJson;
    setRqLoading(true);
    try {
      setRqError(null);
      response = await fetch(url, options);
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      resJson = await response.json();
    } catch (err) {
      setRqError(err.message);
    } finally {
      setRqLoading(false);
    }
    setDataJson(resJson);
    return {
      response,
      resJson,
    };
  }, []);

  return {
    request,
    rqError,
    rqLoading,
    dataJson,
  };
};

export default useFetch;
