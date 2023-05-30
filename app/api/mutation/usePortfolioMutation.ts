import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addToStorage, getFromStorage } from "~/utils/local-storage/storage.config";
import { IPortfolioHistory } from "../query/useGetPortfolio";
import { queryKeys } from "~/api/queryKeys";


export interface IAddPortolioProps {
    id: string,
    price: number,
    count: number
}


interface IDeleteProps {
    id: string,
}

export const mutationFnAdd = async (data: IAddPortolioProps): Promise<IAddPortolioProps> => {
    if (typeof window === 'undefined') {
        throw new Error("app is running on the server")
    }

    const result = getFromStorage<IPortfolioHistory[]>("portfolio");

    if (!result) {
        addToStorage("portfolio", [data])
    }
    else {
        addToStorage("portfolio", [...result, data])
    }

    return data
}

const mutationFnRemove = async (data: IDeleteProps) => {
    const result = getFromStorage<IPortfolioHistory[]>("portfolio");
    const newResult = result?.filter(element => {
        return element.id !== data.id
    })
    addToStorage("portfolio", newResult)
    return newResult;
}

export const usePortfolioMutation = () => {
    const queryClient = useQueryClient();
    const { mutate: removeCoin, isLoading: isRemoving } = useMutation<
        IPortfolioHistory[] | undefined,
        AxiosError,
        IDeleteProps
    >({
        // mutationKey: [queryKeys.portfolio, "remove"],
        mutationFn: mutationFnRemove,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.price() })

            const cachedData = queryClient.getQueryData<IPortfolioHistory[]>(queryKeys.portfolio());
            if (cachedData) {
                queryClient.setQueryData(queryKeys.portfolio(), () => {
                    return cachedData.filter(
                        (item) => item.id !== variables.id
                    )
                });
            }
        },

    })

    const { mutate: addToPortfolio, isLoading: isAdding } = useMutation<
        IAddPortolioProps,
        AxiosError,
        IAddPortolioProps
    >({
        // mutationKey: [queryKeys.portfolio, "add"],
        mutationFn: mutationFnAdd,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.price() })
        }
    })

    return { addToPortfolio, isAdding, removeCoin, isRemoving }
}