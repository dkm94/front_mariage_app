import axios, { AxiosRequestConfig } from 'axios';

type RequestHandler<TParams, TResult> = (params?: TParams) => Promise<AxiosRequestConfig>;

interface ApiResponse<T> {
  data?: T;
  statusCode: number;
  success: boolean;
  message?: string;
}

export const requestHandler = <TParams, TResult>(
  handler: RequestHandler<TParams, TResult>
): ((params?: TParams) => Promise<ApiResponse<TResult>>) => {
  return async (params?: TParams): Promise<ApiResponse<TResult>> => {
    try {
      const config = await handler(params);
      const response = await axios(config);
      return {
        data: response.data.data,
        statusCode: response.data.statusCode,
        success: response.data.success,
      };
    } catch (error) {
      return {
        statusCode: error.response ? error.response.status : 500,
        success: false,
        message: error.message,
      };
    }
  };
};