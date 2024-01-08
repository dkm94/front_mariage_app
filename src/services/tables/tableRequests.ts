import { requestHandler } from "../../helpers/requestHandler";
import { TableType } from "../../../types";

interface AddGuestsParams {
    id: string;
    guestIds: string[];
}

interface UpdateTableNameParams {
    id: string;
    name: string;
}

export const getTables = requestHandler<void, TableType[]>((params) => {
    return Promise.resolve({
    method: 'get',
    url: '/api/admin/tables/',
    params: params || {}, // params is optional, provide an empty object if not provided
    });
});

export const updateTableWithGuests = requestHandler<AddGuestsParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: `/api/admin/guests/addtable/${params?.id}`,
    data: {
        guestIds: params?.guestIds,
    },
    params: params || {}
    });
});

export const updateTablesName = requestHandler<UpdateTableNameParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: `/api/admin/tables/edit/${params?.id}`,
    data: {
        name: params?.name
    },
    params: params
    });
});