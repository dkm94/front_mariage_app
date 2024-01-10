import { requestHandler } from "../../../helpers/requestHandler";
import { FoodType } from "../../../../types";

export const getBeverages = requestHandler<void, FoodType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/menu/beverages',
      params: params || {},
    });
  });