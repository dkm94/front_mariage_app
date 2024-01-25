import { requestHandler } from "../helpers/requestHandler";

type Food = {
    name: string;
    mariageID: string;
    category: string;
}

export const getFoods = requestHandler<void, Food[]>((params) => {
    return Promise.resolve({
    method: 'get',
    url: '/api/admin/reception/food',
    });
});