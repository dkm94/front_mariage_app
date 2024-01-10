import { requestHandler } from "../../../helpers/requestHandler";
import { FoodType } from "../../../../types";

export const getStarters = requestHandler<void, FoodType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/menu/starters',
      params: params || {},
    });
  });