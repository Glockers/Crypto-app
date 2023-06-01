import { ReactElement, useEffect } from "react";
import {
  ActionArgs,
  LoaderArgs,
  V2_MetaArgs,
  V2_MetaFunction,
  json,
} from "@remix-run/node";
import { getHistoryCoinFn } from "~/api/query/useGetCryptoHistory";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import styled from "styled-components";
import { CoinContent, CointTitle, RoutingComponent } from "~/pages";
import { getCoinFn } from "~/api/query/useGetOneCoin";
import { queryKeys } from "~/api/queryKeys";

export const meta: V2_MetaFunction = (args: V2_MetaArgs) => {
  const param = args.params;
  return [{ title: `About ${param.id}` }];
};

export async function loader({ params }: LoaderArgs) {
  const queryClient = new QueryClient();
  const id = params?.id ?? "";
  await queryClient.prefetchQuery(queryKeys.coin_history(id), () =>
    getHistoryCoinFn({ id })
  );

  await queryClient.prefetchQuery(queryKeys.coin(id), () => getCoinFn({ id }));
  return json({ dehydratedState: dehydrate(queryClient) });
}

const Layout = styled.div`
  overflow: hidden;
  min-height: 100vh;
`;

const CryptoDetail = (): ReactElement => {
  return (
    <Layout>
      <CointTitle />
      <RoutingComponent />
      <CoinContent />
    </Layout>
  );
};

export default CryptoDetail;
