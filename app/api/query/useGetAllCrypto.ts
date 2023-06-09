import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ICoin } from "./useGetOneCoin";
import { queryKeys } from "../queryKeys";
import { api } from "../utils";

export interface CoinCapAssetsResponse {
    data: Array<ICoin>;
    timestamp: number;
}

export interface MyPortfolio {
    data: Array<{
        crypto: ICoin,
        count: number
    }>
}

export type TCryptoState = "all" | "popular"

export interface IUseGetMeQueryProps {
    state: TCryptoState
}

export const getAllCoinsFn = async ({
    state
}: IUseGetMeQueryProps) => {
    const response = await api.get<CoinCapAssetsResponse>("/assets", {
        params: {
            limit: state === "popular" ? 3 : undefined
        }
    })
    response.data.data = response.data.data.map(elem => {
        return { ...elem, priceUsd: Number(elem.priceUsd), img: `https://assets.coincap.io/assets/icons/${(elem.symbol).toLowerCase()}@2x.png` }
    })
    return response.data
};

export const useGetAllCrypto = (props: IUseGetMeQueryProps) => {
    const { data, isLoading, error, isSuccess, } = useQuery<CoinCapAssetsResponse, AxiosError>(
        {
            queryKey: queryKeys.kind_of_coins(props.state),
            queryFn: () => getAllCoinsFn(props),
            refetchInterval: 10000,
        }
    );


    return { data, isLoading: isLoading, error, isSuccess };
}