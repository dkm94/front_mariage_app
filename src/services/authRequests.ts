import { requestHandler } from "../helpers/requestHandler";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  firstPerson: string;
  secondPerson: string;
  confirmPassword?: string;
}

export const login = requestHandler<LoginParams, any>((params) => {
    return Promise.resolve({
      method: 'post',
      url: '/api/auth/adminLogin',
      params: params || {},
      data: {
        email: params?.email,
        password: params?.password
      }
    });
  });

export const register = requestHandler<RegisterParams, any>((params) => {
  return Promise.resolve({
    method: 'post',
    url: '/api/auth/createAccount',
    params: params || {},
    data: {
      email: params?.email,
      password: params?.password,
      firstPerson: params?.firstPerson,
      secondPerson: params?.secondPerson
    }
  });
});