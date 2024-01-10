import { requestHandler } from "../../../helpers/requestHandler";
import { FoodType } from "../../../../types";

export const getMaincourses = requestHandler<void, FoodType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/menu/maincourses',
      params: params || {},
    });
  });