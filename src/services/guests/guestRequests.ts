import { requestHandler } from "../../helpers/requestHandler";
import { GuestType } from "../../../types";

interface GetGuestsParams {
    id: string;
}

interface AddGuestParams {
  name: string;
}

interface UpdateGuestParams {
  id: string;
  name: string;
  family: string;
}

interface DeleteGuestParams {
  id: string;
}

export const getGuests = requestHandler<void, GuestType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/guests',
      params: params || {}, // params is optional, provide an empty object if not provided
    });
  });

export const addGuest = requestHandler<AddGuestParams, any>((params) => {
  return Promise.resolve({
    method: 'post',
    url: '/api/admin/guests/add',
    params: params || {},
    data: {
      name: params?.name,
  }
  });
});

export const updateGuest = requestHandler<UpdateGuestParams, any>((params) => {
  return Promise.resolve({
  method: 'post',
  url: `api/admin/guests/edit/${params?.id}`,
  data: {
    _id: params?.id,
    name: params?.name,
    family: params?.family,
  },
  params: params
  });
});

export const deleteGuest = requestHandler<DeleteGuestParams, any>((params) => {
  return Promise.resolve({
  method: 'delete',
  url: `/api/admin/guests/delete/${params?.id}`,
  params: params
  });
});
//   const getGuestById = requestHandler<GetGuestParams, Guest[]>((params) => ({
//     method: 'get',
//     url: `/api/admin/guests/${params?.id}`, // adjust the URL accordingly
//   }));

// export const deleteGuest = requestHandler<GetGuestsParams, void>((params) => axios.delete(`/api/admin/guests/delete/, {params}`));