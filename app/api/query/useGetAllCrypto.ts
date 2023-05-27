import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "../utils";

export interface CoinCapAssetsResponse {
    data: Array<Crypto>;
    timestamp: number;
}

export interface MyPortfolio {
    data: Array<{
        crypto: Crypto,
        count: number
    }>
}

export type TCryptoState = "all" | "my" | "popular"

export interface IUseGetMeQueryProps {
    state: TCryptoState
    // initialData?: any
}


export const getAllCoinsFn = async ({
    state
}: IUseGetMeQueryProps) => {
    if (state === "my") {
        // read from local storage
    }

    if (state === "popular") {
        const response = await request().get<CoinCapAssetsResponse>("/assets?limit=3")
        response.data.data = response.data.data.map(elem => {
            return { ...elem, img: `https://assets.coincap.io/assets/icons/${(elem.symbol).toLowerCase()}@2x.png` }
        })
        return response.data
    }

    if (state === "all") {
        let response = await request().get<CoinCapAssetsResponse>("/assets")
        response.data.data = response.data.data.map(elem => {
            return { ...elem, img: `https://assets.coincap.io/assets/icons/${(elem.symbol).toLowerCase()}@2x.png` }
        })
        return response.data
    }

    return {} as CoinCapAssetsResponse

};

export const useGetAllCrypto = (props: IUseGetMeQueryProps) => {
    const { data, isLoading, error, isSuccess, } = useQuery<CoinCapAssetsResponse, AxiosError>(
        {
            queryKey: ["cryptos", props.state],
            queryFn: () => getAllCoinsFn(props),
            refetchInterval: 10000,
            // initialData: props.initialData
        }
    );


    return { data, isLoading: isLoading, error, isSuccess };
}