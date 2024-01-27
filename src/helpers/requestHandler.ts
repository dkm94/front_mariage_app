import axios, { AxiosRequestConfig } from 'axios';

type RequestHandler<TParams, TResult> = (params?: TParams) => Promise<AxiosRequestConfig>;

interface ApiResponse<T> {
  data?: T;
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
}

// type du parametre et type de la réponse
export const requestHandler = <TParams, TResult>(
  handler: RequestHandler<TParams, TResult>
): ((params?: TParams) => Promise<ApiResponse<TResult>>) => {
  return async (params?: TParams): Promise<ApiResponse<TResult>> => {
    try {
      const config = await handler(params);
      const response = await axios(config);
      return {
        data: response.data.data,
        statusCode: response.status,
        success: response.data.success,
        message: response.data.message,
        token: response.data.token,
      };
    } catch (error) {
      return {
        statusCode: error.response ? error.response.status : 500,
        success: error.response.data.success,
        message: error.response.data.message,
      };
    }
  };
};