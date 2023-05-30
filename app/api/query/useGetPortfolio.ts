import { getFromStorage } from "~/utils/local-storage/storage.config";
import { IAddPortolioProps } from "../mutation/usePortfolioMutation";
import { getCoinFn } from "./useGetOneCoin";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface IPortfolioResult extends IAddPortolioProps { }


export const getPortfolioPriceFn = () => {
    const result = getFromStorage<IPortfolioResult[]>("portfolio");
    return result?.reduce((sum, current) => {
        return sum + current.count * current.price
    }, 0) ?? 0
}


interface ICurrentPrice {
    id: string,
    count: number
}

export const getPortfolioCurrentPriceFn = async () => {
    const data = getFromStorage<IPortfolioResult[]>("portfolio");
    const groupedData = !data ? null : Object.values(data).reduce((result, item) => {
        const { id, count } = item;
        const array_id = result.findIndex(element => element.id === id);

        if (array_id < 0) {
            return [...result, { id, count }]
        }
        else {
            result[array_id].count += count
            return result
        }
    }, [] as Array<ICurrentPrice>)

    if (!groupedData) return 0

    const groupedDataWithPrice = await Promise.all(
        groupedData.map(async (element) => {
            const coin = await getCoinFn({ id: element.id })
            return { element, price: coin.data.priceUsd * element.count }
        }))

    const calculatedPortfolio = groupedDataWithPrice.reduce((sum, item) => {
        return sum + item.price
    }, 0)

    return calculatedPortfolio
}

export const getPortfolioFn = () => {

}


export const useGetPortfolio = () => {
    const { data: myMoney, isLoading: isMyMoneyLoading } = useQuery<number, AxiosError>(
        {
            queryKey: ["my-money"],
            queryFn: getPortfolioPriceFn,
            refetchInterval: 5000

        }
    );

    const { data: myCurrentMoney, isLoading: isMyCurrentMoney } = useQuery<number, AxiosError>(
        {
            queryKey: ["my-current-money"],
            queryFn: getPortfolioCurrentPriceFn,
            refetchInterval: 5000

        }
    );
    return { myMoney, isMyMoneyLoading, myCurrentMoney, isMyCurrentMoney }
}