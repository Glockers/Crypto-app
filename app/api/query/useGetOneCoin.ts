import { TUnixTimestamp } from "~/utils/convertor/convertor.models";
import { api } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "../queryKeys";

export interface ICoin {
    id: string;
    rank: number;
    name: string;
    symbol: string;
    changePercent24Hr: number;
    priceUsd: number;
    img?: string;
    maxSupply: string;
    supply: string;
}


interface ICoinProps {
    id: string,
}

interface ICoinResult {
    data: ICoin,
    timestamap: TUnixTimestamp
}


export const getCoinFn = async ({
    id,
}: ICoinProps) => {
    const response = await api.get<ICoinResult>(`/assets/${id}`)
    response.data.data = { ...response.data.data, img: `https://assets.coincap.io/assets/icons/${(response.data.data.symbol).toLowerCase()}@2x.png` }
    return response.data
}


export const useGetCoin = ({ id }: ICoinProps) => {
    const { data, isLoading, error, isSuccess, } = useQuery<ICoinResult, AxiosError>(
        {
            queryKey: queryKeys.coin(id),
            queryFn: () => getCoinFn({ id }),
            refetchInterval: 1000
        }
    );
    return { data, isLoading: isLoading, error, isSuccess };
}
