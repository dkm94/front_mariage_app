import { requestHandler } from "../helpers/requestHandler";
import { OperationType } from "../../types";

interface OperationParams {
  id?: string;
  category?: string;
  price?: string | number;
  description?: string;
  mariageID?: string;
}

export const getOperations = requestHandler<void, OperationType[]>((params) => {
  return Promise.resolve({
    method: 'get',
    url: '/api/budget/operations',
    params: params || {},
  });
});

export const addOperation = requestHandler<OperationParams, any>((params) => {
  return Promise.resolve({
  method: 'post',
  url: '/api/budget/operations/add',
  params: params || {},
  data: {
      category: params?.category,
      price: params?.price,
      description: params?.description
  }
  });
});

export const updateOperation = requestHandler<OperationParams, any>((params) => {
  return Promise.resolve({
  method: 'post',
  url: `/api/budget/operations/edit/${params?.id}`,
  data: {
      category: params?.category,
      price: params?.price,
      description: params?.description
  },
  params: params
  });
});

export const deleteOperation = requestHandler<OperationParams, any>((params) => {
  return Promise.resolve({
  method: 'delete',
  url: `/api/budget/operations/delete/${params?.id}`,
  params: params
  });
});