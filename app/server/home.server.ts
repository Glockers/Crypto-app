import { json } from "@remix-run/node";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getAllCoinsFn } from "~/api/query/useGetAllCrypto";
import { queryKeys } from "~/api/queryKeys";

export const loadAllCoins = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(queryKeys.kind_of_coins("all"), () =>
        getAllCoinsFn({ state: "all" })
    );
    return json({ dehydratedState: dehydrate(queryClient) });
}