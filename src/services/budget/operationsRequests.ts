import { requestHandler } from "../../helpers/requestHandler";
import { OperationType } from "../../../types";

export const getOperations = requestHandler<void, OperationType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/budget/operations',
      params: params || {},
    });
  });