import { GuestType } from "../../types";

export default function formatArray(arr){
    const formattedArray = arr.map((item: GuestType) => {
        const formattedItem = {
            name: item?.name,
            id: item?._id,
            tableID: item?.tableID
        }
        return formattedItem;
    });
    return formattedArray;
}