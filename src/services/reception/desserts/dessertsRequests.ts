import { requestHandler } from "../../../helpers/requestHandler";
import { FoodType } from "../../../../types";

export const getDesserts = requestHandler<void, FoodType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/menu/desserts',
      params: params || {},
    });
  });