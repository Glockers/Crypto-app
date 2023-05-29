import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addToStorage, getFromStorage } from "~/utils/local-storage/storage.config";


interface IAddProps {
    id: string,
    count: number
}

interface IAddResult {
    id: string,
    count: number
}

interface IDeleteProps {
    id: string,
    count: number
}

export const mutationFnAdd = async (data: IAddProps): Promise<IAddResult[] | null> => {
    if (typeof window === 'undefined') {
        console.log("app is running on the server")
        return null;
    }
    const result = getFromStorage<IAddResult[]>("portfolio");
    let flag = false;
    const newArray = result?.map((item) => {
        if (item.id === data.id) {
            flag = true;
            console.log(item.count)
            return { ...item, count: item.count + data.count };
        }
        return item;
    })

    if (flag) {
        // console.log(newArray)
        addToStorage("portfolio", newArray)
        return newArray ?? []
    }
    addToStorage<IAddResult[]>("portfolio", [...result || [], data])
    return [...result || [], data]

}

const mutationFnRemove = async (data: any) => {

}

export const usePortfolioMutation = () => {
    const client = useQueryClient();
    const { mutate: removeCoin, isLoading: isRemoving } = useMutation<
        any,
        AxiosError,
        any
    >({
        mutationKey: ["portfolio"],
        mutationFn: mutationFnRemove,
    })

    const { mutate: addToPortfolio, isLoading: isAdding } = useMutation<
        IAddResult[] | null,
        AxiosError,
        IAddProps
    >({
        mutationKey: ["portfolio"],
        mutationFn: mutationFnAdd,
    })

    return { addToPortfolio, isAdding }
}