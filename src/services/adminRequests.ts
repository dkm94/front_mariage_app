import { requestHandler } from './../helpers/requestHandler';

export const getAdmins = requestHandler<void, any[]>((params) => {
    return Promise.resolve({
    method: 'get',
    url: '/api/admin/admin/',
    params: params
    });
});