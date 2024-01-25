import { requestHandler } from "../helpers/requestHandler";

interface LoginParams {
    email: string;
    password: string;
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