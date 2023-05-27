import { TUnixTimestamp } from "./convertor.models";

export const convertTimestampToDate = (timestamp: TUnixTimestamp | null) => {
    if (!timestamp) return null
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;

}

