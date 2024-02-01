import { requestHandler } from "../helpers/requestHandler";
import { WeddingType } from "../../types";

interface WeddingParams {
    id: string | undefined;
    firstPerson?: string;
    secondPerson?: string;
}

export const getWedding = requestHandler<WeddingParams, WeddingType>((params) => {
    return Promise.resolve({
    method: 'get',
    url: `/api/admin/wedding/${params?.id}`,
    params: params,
    });
});

export const updateWedding = requestHandler<WeddingParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: `/api/admin/wedding/edit/${params?.id}`,
    data: {
        firstPerson: params?.firstPerson,
        secondPerson: params?.secondPerson,
    },
    params: params
    });
  });