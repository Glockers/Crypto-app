import { ReactElement } from "react";
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
import { CoinContent, CointTitle } from "~/pages";

export const meta: V2_MetaFunction = (args: V2_MetaArgs) => {
  const param = args.params;
  return [{ title: `About ${param.id}` }];
};

export async function loader({ params }: LoaderArgs) {
  const queryClient = new QueryClient();
  const id = params?.id ?? "";
  await queryClient.prefetchQuery(["coin/history", id], () =>
    getHistoryCoinFn({ id })
  );
  return json({ dehydratedState: dehydrate(queryClient) });
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const count = form.get("count");
  const fields = { count };
  return fields;
};

const Layout = styled.div`
  overflow: hidden;
  min-height: 100vh;
`;

const CryptoDetail = (): ReactElement => {
  return (
    <Layout>
      <CointTitle />
      <CoinContent />
    </Layout>
  );
};

export default CryptoDetail;
