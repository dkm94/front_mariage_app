import { requestHandler } from "../helpers/requestHandler";
import { TableType } from "../../types";

interface AddGuestsParams {
    id: string;
    guestIds: string[];
}

interface TableParams {
    id?: string;
    name?: string;
}

export const getTables = requestHandler<void, TableType[]>((params) => {
    return Promise.resolve({
    method: 'get',
    url: '/api/admin/tables/',
    params: params || {}, // params is optional, provide an empty object if not provided
    });
});

export const addTable = requestHandler<TableParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: '/api/tables/add/',
    params: params || {},
    data: {
        name: params?.name,
    }
    });
});

export const deleteTable = requestHandler<TableParams, any>((params) => {
    return Promise.resolve({
    method: 'delete',
    url: `/api/tables/delete/${params?.id}`,
    params: params
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

export const updateTablesName = requestHandler<TableParams, any>((params) => {
    return Promise.resolve({
    method: 'post',
    url: `/api/admin/tables/edit/${params?.id}`,
    data: {
        name: params?.name
    },
    params: params
    });
});