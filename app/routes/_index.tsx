import { V2_MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData, } from "@remix-run/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import styled from "styled-components";
import {
  IUseGetMeQueryProps,
  getAllCoinsFn,
  useGetAllCrypto,
} from "~/api/query/useGetAllCrypto";
import Button from "~/components/Button";
import { Spinner } from "~/components/Spinner";
import { ITableColumns, Table } from "~/components/Table";
import { converToProcent, convertToNormalNumber, getJSXElementProcent } from "~/utils/convertor";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Main" }];
};

const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  padding: 30px;
`;

const Text = styled.h1`
  text-align: center;
`;

const WrapperNameCrypto = styled.div`
display: flex;
gap: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const ImageWrapper = styled.div`
  img{
    height: 30px !important;
    width: 30px !important;
  }
`

const columns: ITableColumns<Crypto>[] = [
  { title: "Rank", dataIndex: "rank" },
  {
    title: "Name",
    dataIndex: "name",
    render(record) {
      return (
        <Link to={`/about-crypto/${record.id}`}>
          <WrapperNameCrypto><ImageWrapper><img src={record.img} /></ImageWrapper><div>{record.name}</div></WrapperNameCrypto>
        </Link>
      );
    },
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    render(record) {
      return (
        <Link to={`/about-crypto/${record.id}`}>
          <WrapperNameCrypto>{record.symbol}</WrapperNameCrypto>
        </Link>
      );
    },
  },
  {
    title: "Price", dataIndex: "priceUsd", render(record) {
      return "$" + convertToNormalNumber(record.priceUsd).toLocaleString("en-US")
    },
  },
  {
    title: "Change(24Hr)",
    dataIndex: "changePercent24Hr",
    render(record) {
      return getJSXElementProcent(converToProcent(record.changePercent24Hr));
    },
  },
  {
    title: "Control",
    dataIndex: "id",
    render(record) {
      return (
        <Button variant="secondary" onClick={() => console.log(record)}>
          Купить
        </Button>
      );
    },
  },
];


export async function loader() {
  // const coins = await getAllCoinsFn({ state: "all" })
  // return json({ coins })
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["cryptos", "all"], () => getAllCoinsFn({ state: "all" }))
  return json({ dehydratedState: dehydrate(queryClient) })
}

export default function Index() {
  const { data, isLoading } = useGetAllCrypto({ state: "all" });
  return (
    <Container>
      <Text>Страница криптовалют</Text>
      <Suspense fallback={<Spinner />}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table<Crypto>
            dataSource={data?.data ? data.data : []}
            columns={columns}
            countElementOnPage={10}
          />
        )}
      </Suspense>
    </Container>
  );
}

// export function ErrorBoundary() {
//   return (
//     <>
//       <div>Обработана неизвестная ошибка</div>
//     </>
//   );
// }
