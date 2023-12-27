import { requestHandler } from "../../helpers/requestHandler";
import { GuestType } from "../../../types";

interface GetGuestsParams {
    id: string;
}

export const getGuests = requestHandler<void, GuestType[]>((params) => {
    return Promise.resolve({
      method: 'get',
      url: '/api/admin/guests',
      params: params || {}, // params is optional, provide an empty object if not provided
    });
  });

//   const getGuestById = requestHandler<GetGuestParams, Guest[]>((params) => ({
//     method: 'get',
//     url: `/api/admin/guests/${params?.id}`, // adjust the URL accordingly
//   }));

// export const deleteGuest = requestHandler<GetGuestsParams, void>((params) => axios.delete(`/api/admin/guests/delete/, {params}`));