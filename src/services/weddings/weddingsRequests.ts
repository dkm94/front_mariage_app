import { requestHandler } from "../../helpers/requestHandler";
import { WeddingType } from "../../../types";

interface IGetWeddingParams {
    id: string | undefined;
}

export const getWedding = requestHandler<IGetWeddingParams, WeddingType>((params) => {
    return Promise.resolve({
    method: 'get',
    url: `/api/admin/wedding/${params?.id}`,
    params: params,
    });
});