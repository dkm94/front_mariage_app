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
  initialData: TResult
) => {

  const [data, setData] = useState<TResult>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async (params?: TParams) => {
        try {
          setLoading(true);
          const response = await handler(params);
          const apiResponse = response as ApiResponse<TResult>;
    
          if (apiResponse.success && apiResponse.statusCode === 200) {
            setData(apiResponse.data || initialData);
          } else {
            setError(true);
        if(apiResponse.message === "Network Error"){
          setErrorMessage("Oups, une erreur s'est produite.");
        } else {
          setErrorMessage(apiResponse.message);
        }
          }
        } catch (error) {
        setError(true);
        //   setErrorMessage(
        //     error.response && error.response.data && error.response.data.message
        //     ? error.response.data.message
        //     : 'Une erreur s\'est produite.'
        //   );
        // } finally {
        setErrorMessage(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
  }, []);

  return { data, setData, loading, error, errorMessage };
};

export default useFetch;
