import { requestHandler } from "../helpers/requestHandler";

type Food = {
    name: string;
    mariageID: string;
    category: string;
}
interface FoodParams {
    id?: string;
    name?: string;
    category?: string;
}

export const getFoods = requestHandler<void, Food[]>((params) => {
    return Promise.resolve({
    method: 'get',
    url: '/api/admin/reception/food',
    });
});

export const addFood = requestHandler<FoodParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: '/api/reception/food/add',
    params: params || {},
    data: {
    name: params?.name,
    category: params?.category
    },
    signal: new AbortController().signal
    });
});

export const updateFood = requestHandler<FoodParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: `/api/reception/food/edit/${params?.id}`,
    data: {
        name: params?.name
    },
    params: params,
    signal: new AbortController().signal
    });
});

export const deleteFood = requestHandler<FoodParams, any>((params) => {
    return Promise.resolve({
    method: 'delete',
    url: `/api/reception/food/delete/${params?.id}`,
    params: params,
    signal: new AbortController().signal
    });
});