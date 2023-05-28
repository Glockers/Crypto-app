import { TUnixTimestamp } from "~/utils/convertor/convertor.models";
import { api } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
}: ICoinProps): Promise<ICoinResult> => {
    const response = await api.get<ICoinResult>(`/assets/${id}`)
    response.data.data = { ...response.data.data, img: `https://assets.coincap.io/assets/icons/${(response.data.data.symbol).toLowerCase()}@2x.png` }
    return response.data
}


export const useGetCoin = ({ id }: ICoinProps) => {
    const { data, isLoading, error, isSuccess, } = useQuery<ICoinResult, AxiosError>(
        {
            queryKey: ["coin", id],
            queryFn: () => getCoinFn({ id }),
        }
    );
    return { data, isLoading: isLoading, error, isSuccess };
}
