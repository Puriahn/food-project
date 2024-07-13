import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.messeage || "somthing went wrong... faild to send request"
    );
  }

  return resData;
}

export default function useHttp(url, config, ini) {
  const [data, setData] = useState(ini);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData(){
    setData(ini)
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });

        setData(resData);
      } catch (error) {
        setError(error.message || "somthing went wrong...");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}
