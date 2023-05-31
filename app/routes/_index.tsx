import { V2_MetaFunction, json } from "@remix-run/node";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import styled from "styled-components";
import { getAllCoinsFn } from "~/api/query/useGetAllCrypto";
import { queryKeys } from "~/api/queryKeys";
import { CointTable } from "~/pages";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Main" }];
};

const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  padding: 30px;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const Text = styled.h1`
  text-align: center;
`;

export async function loader() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(queryKeys.kind_of_coins("all"), () =>
    getAllCoinsFn({ state: "all" })
  );
  return json({ dehydratedState: dehydrate(queryClient) });
}

export default function Index() {
  return (
    <Container>
      <Text>Страница криптовалют</Text>
      <CointTable />
    </Container>
  );
}
