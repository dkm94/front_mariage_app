import { requestHandler } from "../helpers/requestHandler";
import { GuestType } from "../../types";

interface AddGuestParams {
  name: string;
  family: string;
}

interface UpdateGuestParams {
  id: string;
  name: string;
  family: string;
}

interface DeleteGuestParams {
  id: string;
}

interface UpdateMedia {
  id: string;
  formData: FormData;
}

export const getGuests = requestHandler<void, GuestType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/guests',
      params: params || {}, // params is optional, provide an empty object if not provided
    });
  });

export const addGuest = requestHandler<AddGuestParams, any>((params) => {
  return Promise.resolve({
    method: 'post',
    url: '/api/guests/add',
    params: params || {},
    data: {
      name: params?.name,
      family: params?.family
  }
  });
});

export const updateGuest = requestHandler<UpdateGuestParams, any>((params) => {
  return Promise.resolve({
  method: 'post',
  url: `api/guests/edit/${params?.id}`,
  data: {
    _id: params?.id,
    name: params?.name,
    family: params?.family,
  },
  params: params
  });
});

export const updateGuestMedia = requestHandler<UpdateMedia, any>((params) => {
  return Promise.resolve({
  method: 'post',
  url: `api/guests/edit/${params?.id}`,
  formData: params?.formData,
  params: params,
  headers: {'Content-Type': 'multipart/form-data' }
  });
});

export const deleteGuest = requestHandler<DeleteGuestParams, any>((params) => {
  return Promise.resolve({
  method: 'delete',
  url: `/api/guests/delete/${params?.id}`,
  params: params
  });
});