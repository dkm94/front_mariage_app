import axios from "axios";

import { requestHandler } from "../../helpers/requestHandler";
import { GuestType } from "../../../types";

export const getGuests = requestHandler<void, GuestType[]>(() => axios.get("/api/admin/guests/"));
