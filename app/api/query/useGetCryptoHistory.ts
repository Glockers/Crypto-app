import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../utils";
import { TUnixTimestamp } from "~/utils/convertor/convertor.models";
import { queryKeys } from "../queryKeys";

export interface IHistoryCrypto {
    data: Array<{
        priceUsd: number,
        time: TUnixTimestamp,
        date: Date
    }>
    timestamp: TUnixTimestamp
}

interface IProps {
    id: string,
}

export const getHistoryCoinFn = async ({
    id,
}: IProps): Promise<IHistoryCrypto> => {
    const currentDate = new Date().getTime();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const timeStampStartDate = startDate.getTime()
    const response = await api.get<IHistoryCrypto>(`https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=${timeStampStartDate}&end=${currentDate}`)
    return response.data
}

export const useGetHistoryCoin = (props: IProps) => {
    const { data, isLoading, error, isSuccess, } = useQuery<IHistoryCrypto, AxiosError>(
        {
            queryKey: queryKeys.coin_history(props.id),
            queryFn: () => getHistoryCoinFn(props),
        }
    );


    return { data, isLoading: isLoading, error, isSuccess };
}
