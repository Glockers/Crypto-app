import { getFromStorage } from "~/utils/local-storage/storage.config";
import { IAddPortolioProps } from "../mutation/usePortfolioMutation";
import { getCoinFn } from "./useGetOneCoin";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IPortfolioHistory, getPortfolioFn } from "./useGetPortfolio";





export const getPortfolioPriceFn = () => {
    const result = getFromStorage<IPortfolioHistory[]>("portfolio");
    return result?.reduce((sum, current) => {
        return sum + current.count * current.price
    }, 0) ?? 0
}



export const getPortfolioCurrentPriceFn = async () => {
    const groupedData = await getPortfolioFn()
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



export const useGetCostPortfolio = () => {
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