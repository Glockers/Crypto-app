import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "../utils";
import { useEffect, useState } from "react";

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

interface IUseGetMeQueryProps {
    state: TCryptoState
    search?: string;
    limit?: string;
}


const queryFn = async ({
    search,
    limit,
    state
}: IUseGetMeQueryProps) => {
    if (state === "my") {
        // read from local storage
    }

    if (state === "popular") {
        const response = await request().get<CoinCapAssetsResponse>("/assets?limit=3")
        // console.log("test", converToProcent(response.data.data[0].changePercent24Hr))
        return response.data
    }

    if (state === "all") {
        const response = await request().get<CoinCapAssetsResponse>("/assets")
        return response.data
    }

    return {} as CoinCapAssetsResponse

};

export const useGetAllCrypto = (props: IUseGetMeQueryProps) => {
    const { data, isLoading, error, isSuccess, } = useQuery<CoinCapAssetsResponse, AxiosError>(
        {
            queryKey: ["cryptos", props.state],
            queryFn: () => queryFn(props),
            refetchInterval: 10000,
        }
    );


    return { data, isLoading: isLoading, error, isSuccess };
}