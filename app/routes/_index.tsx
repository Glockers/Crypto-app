import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import styled from "styled-components";
import Pagination from "~/components/Pagination";
import { crypto_api } from "~/utils/api/config";

// export const meta: V2_MetaFunction = () => {
//   return [{ title: "New Remix App" }];
// };

const COUNT_ELEMENT = 10;

const Container = styled.div`
  overflow: hidden;
  min-height: 100vh;
  padding: 30px;
`;

const Text = styled.h1`
  text-align: center;
`;
const ContentWrapperStyled = styled.div`
  margin: auto;
  max-width: 95%;
  /* height: 1050px; */
  background-color: #a8a8a8;
  padding: 50px;
  overflow: hidden;
`;

const Element = styled.div`
  background-color: #ff8d8d;
  height: 100px;
`;

interface Crypto {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  changePercent24Hr: number;
  priceUsd: number;
}

export interface CoinCapAssetsResponse {
  data: Array<Crypto>;
  timestamp: number;
}

export async function loader() {
  const assets = (
    await crypto_api.get<CoinCapAssetsResponse>("/assets")
  ).data;

  return assets;
}

const WrapperCryptos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

`

const WrapperNavigatePanetel = styled.div`
  
`
export default function Index() {
  const cryptos = useLoaderData<typeof loader>();
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <Container>
      <Text>Страница криптовалют</Text>
      <ContentWrapperStyled>
        <WrapperCryptos>
          {cryptos.data.slice(COUNT_ELEMENT * currentPage - COUNT_ELEMENT, COUNT_ELEMENT * currentPage).map((element) => (
            <Element key={element.id}>{element.id} {element.rank}</Element>
          ))}
        </WrapperCryptos>
        <WrapperNavigatePanetel>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(cryptos.data.length / COUNT_ELEMENT)} // Общее количество страниц
            onPageChange={handlePageChange}
          />
        </WrapperNavigatePanetel>
      </ContentWrapperStyled>
    </Container>
  );
}
