import { AxiosError, AxiosResponse } from "axios";

// T: parameter type
// V: API's returned value type
type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<V> = {
  code: "success";
  data: V;
  status: number;
};

// E: error
type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: E;
  status: number;
};

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

export const requestHandler =
    <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
    async (params?: T): Promise<BaseResponse<V, E>> => {
        try {
            const response = await request(params);
            return { code: "success", data: response.data, status: response.status };
        } catch (e) {
            return { code: "error", error: e as E, status: e.status };
        }
    };
