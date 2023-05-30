import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addToStorage, getFromStorage } from "~/utils/local-storage/storage.config";
import { IPortfolioHistory } from "../query/useGetPortfolio";


export interface IAddPortolioProps {
    id: string,
    price: number,
    count: number
}


// interface IDeleteProps {
//     id: string,
//     count: number
// }

export const mutationFnAdd = async (data: IAddPortolioProps): Promise<IAddPortolioProps | null> => {
    if (typeof window === 'undefined') {
        console.log("app is running on the server")
        return null;
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

// const mutationFnRemove = async (data: any) => {

// }

export const usePortfolioMutation = () => {
    const client = useQueryClient();
    // const { mutate: removeCoin, isLoading: isRemoving } = useMutation<
    //     any,
    //     AxiosError,
    //     any
    // >({
    //     mutationKey: ["portfolio"],
    //     mutationFn: mutationFnRemove,
    //     onSuccess: (data) => {
    //         client.invalidateQueries(["my-money"]);
    //     }
    // })

    const { mutate: addToPortfolio, isLoading: isAdding } = useMutation<
        IAddPortolioProps | null,
        AxiosError,
        IAddPortolioProps
    >({
        mutationKey: ["portfolio"],
        mutationFn: mutationFnAdd,
        onSuccess: (data) => {
            client.invalidateQueries(["my-money", "my-current-money"]);
        }
    })

    return { addToPortfolio, isAdding }
}