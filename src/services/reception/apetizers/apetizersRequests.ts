import { requestHandler } from "../../../helpers/requestHandler";
import { FoodType } from "../../../../types";

export const getApetizers = requestHandler<void, FoodType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/menu/apetizers',
      params: params || {},
    });
  });