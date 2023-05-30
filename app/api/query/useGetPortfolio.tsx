import { getFromStorage } from "~/utils/local-storage/storage.config";
import { IAddPortolioProps } from "../mutation/usePortfolioMutation";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { queryKeys } from "~/api/queryKeys";

export interface IPortfolioHistory extends IAddPortolioProps {}

export interface IPortfolio {
  id: string;
  count: number;
}

export const getPortfolioFn = () => {
  const data = getFromStorage<IPortfolioHistory[]>("portfolio");

  const groupedData = !data
    ? null
    : Object.values(data).reduce((result, item) => {
        const { id, count } = item;
        const array_id = result.findIndex((element) => element.id === id);

        if (array_id < 0) {
          return [...result, { id, count }];
        } else {
          result[array_id].count += count;
          return result;
        }
      }, [] as Array<IPortfolio>);
  return groupedData;
};

export const useGetPortfolio = () => {
  const { data, isLoading, error, isSuccess } = useQuery<
    Array<IPortfolio> | null,
    AxiosError
  >({
    queryKey: queryKeys.portfolio(),
    queryFn: () => getPortfolioFn(),
  });
  return { data, isLoading: isLoading, error, isSuccess };
};
