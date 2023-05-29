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

export const mutationFnAdd = async (data: IAddProps) => {
    if (typeof window === 'undefined') {
        console.log("app is running on the server")
        return null;
    }
    const result = getFromStorage<IAddResult[]>("portfolio");
    console.log(result)
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
        console.log(newArray)
        addToStorage("portfolio", newArray)
    } else {
        addToStorage<IAddResult[]>("portfolio", [...result || [], data])
    }

    return flag
}

const mutationFnRemove = async (data: any) => {

}

export const usePortfolioMutation = () => {
    const client = useQueryClient();
    const { mutate: remove, isLoading: isRemoving } = useMutation<
        any,
        AxiosError,
        any
    >({
        mutationKey: ["portfolio"],
        mutationFn: mutationFnRemove,
        // onSuccess(data, variables) {
        //     const cachedData = client.getQueriesData<IGetMeResults[]>([
        //         "/client/clients",
        //     ]);

        //     cachedData.forEach(([queryKey, results]) => {
        //         if (!results) return;
        //         client.setQueriesData(queryKey, () => {
        //             return results.filter((el) => {
        //                 return el.id !== variables.id;
        //             });
        //         });
        //     });
        // }

    })

    const { mutate: add, isLoading: isAdding } = useMutation<
        any,
        AxiosError,
        any
    >({
        mutationKey: ["portfolio"],
        mutationFn: mutationFnAdd,
        // onSuccess(data, variables) {
        //     const cachedData = client.getQueriesData<IGetMeResults[]>([
        //         "/client/clients",
        //     ]);

        //     cachedData.forEach(([queryKey, results]) => {
        //         if (!results) return;
        //         client.setQueriesData(queryKey, () => {
        //             return results.filter((el) => {
        //                 return el.id !== variables.id;
        //             });
        //         });
        //     });
        // }

    })
}