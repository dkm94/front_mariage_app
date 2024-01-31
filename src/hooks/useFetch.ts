import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';

// Types
type RequestHandler<TParams, TResult> = (
    params?: TParams
  ) => Promise<AxiosRequestConfig>;

interface ApiResponse<T> {
  data?: T;
  statusCode: number;
  success: boolean;
  message?: string;
}

// Hook useFetch
const useFetch = <TParams, TResult>(
  handler: RequestHandler<TParams, TResult>,
  initialData: TResult,
) => {

  const [data, setData] = useState<TResult>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [messageType, setMessageType] = useState<"error" | "success" | undefined>(undefined);
  // const [error, setError] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const fetchData = async (params?: TParams) => {
      try {
        setLoading(true);
        const response = await handler();
        const apiResponse = response as ApiResponse<TResult>;
  
        if (apiResponse.success && apiResponse.statusCode === 200) {
          setData(apiResponse.data || initialData);

          if(apiResponse.message) {
            setMessageType("success");
            setMessage(apiResponse.message);
          }
        } else {
          setMessageType("error");

          if(apiResponse.message === "Network Error"){
            setMessage("Oups, une erreur s'est produite.");
          } else {
            setMessage(apiResponse.message);
          }
        }
      } catch (error) {
      setMessageType("error");
      //   setErrorMessage(
      //     error.response && error.response.data && error.response.data.message
      //     ? error.response.data.message
      //     : 'Une erreur s\'est produite.'
      //   );
      // } finally {
      setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {
      fetchData();
  }, []);

  return { data, setData, loading, message, messageType, fetchData, setMessage, setMessageType };
};

export default useFetch;
