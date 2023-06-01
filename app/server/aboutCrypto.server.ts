import { LoaderArgs, json } from "@remix-run/node";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getHistoryCoinFn } from "~/api/query/useGetCryptoHistory";
import { getCoinFn } from "~/api/query/useGetOneCoin";
import { queryKeys } from "~/api/queryKeys";


export const loadCoin = async ({ params }: LoaderArgs) => {
    const queryClient = new QueryClient();
    const id = params?.id ?? "";
    await queryClient.prefetchQuery(queryKeys.coin_history(id), () =>
        getHistoryCoinFn({ id })
    );

    await queryClient.prefetchQuery(queryKeys.coin(id), () => getCoinFn({ id }));
    return json({ dehydratedState: dehydrate(queryClient) });
}