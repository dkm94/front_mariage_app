import { AccountType } from "../../types";
import { requestHandler } from "../helpers/requestHandler";

interface LoginParams {
  email: string;
  password: string;
  signal: AbortSignal;
}

interface RegisterParams {
  email: string;
  password: string;
  firstPerson: string;
  secondPerson: string;
  confirmPassword?: string;
}
interface UpdatePasswordParams {
  id: string;
  password: string;
}

interface GetUserParams {
  id: string;
}

interface DeleteUserParams extends GetUserParams {};

export const login = requestHandler<LoginParams, any>((params) => {
    return Promise.resolve({
      method: 'post',
      url: '/api/auth/adminLogin',
      params: params || {},
      data: {
        email: params?.email,
        password: params?.password
      },
      signal: params?.signal,
      timeout: 4000
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
    },
    signal: new AbortController().signal
  });
});

export const updatePassword = requestHandler<UpdatePasswordParams, any>((params) => {
  return Promise.resolve({
  method: 'post',
  url: `/api/admin/admin/editAccount/${params?.id}`,
  data: {
      password: params?.password
  },
  params: params
  });
});

export const getUser = requestHandler<GetUserParams, AccountType>((params) => {
  return Promise.resolve({
  method: 'get',
  url: `/api/admin/admin/myAccount/${params?.id}`,
  params: params || {},
  });
});

export const deleteAccount = requestHandler<DeleteUserParams, any>((params) => {
  return Promise.resolve({
  method: 'delete',
  url: `/api/admin/admin/deleteAccount/${params?.id}`,
  signal: new AbortController().signal
  });
});