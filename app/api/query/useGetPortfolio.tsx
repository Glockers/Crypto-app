import { getFromStorage } from "~/utils/local-storage/storage.config";
import { IAddPortolioProps } from "../mutation/usePortfolioMutation";

export interface IPortfolioHistory extends IAddPortolioProps {}

interface ICurrentPrice {
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
      }, [] as Array<ICurrentPrice>);
  return groupedData;
};
