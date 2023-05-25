import { ErrorBoundaryComponent } from "@remix-run/node";
import { NavLink, useCatch, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import styled from "styled-components";
import {
  CoinCapAssetsResponse,
  useGetAllCrypto,
} from "~/api/query/useGetAllCrypto";
import request from "~/api/utils";
import ModalAddCrypto from "~/components/CustomModal/ModalAdd";
import Modal from "~/components/Modal";
import Pagination from "~/components/Pagination";
import { ITableColumns, Table } from "~/components/Table";

// export const meta: V2_MetaFunction = () => {
//   return [{ title: "New Remix App" }];
// };


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
  border: 1px solid transparent;
  transition: border-color 0.3s ease;

  &:hover {
    border: 2px solid #c56060;
    cursor: pointer;
  }
`;

export async function loader() {
  const assets = (await request().get<CoinCapAssetsResponse>("/assets")).data;
  return assets;
}

const WrapperCryptos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const WrapperNavigatePanetel = styled.div``;

export default function Index() {
  // const data = useLoaderData<typeof loader>();
  const { data } = useGetAllCrypto({ state: "all" });

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const columns: ITableColumns<Crypto>[] = [
    { title: 'Rank', dataIndex: "rank" },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'priceUsd' },
    { title: 'Change(24Hr)', dataIndex: 'changePercent24Hr',  },

  ];
  return (
    <Container>
      <Text>Страница криптовалют</Text>
      {/* <button onClick={handleOpenModal}>Open Modal</button>

      <Modal isOpen={modalOpen} onClose={handleCloseModal} /> */}
      {/* <ModalAddCrypto /> */}
      <Table<Crypto> dataSource={data?.data ? data.data : []} columns={columns} countElementOnPage={5} />

      {/* <ContentWrapperStyled> */}

      {/* <WrapperCryptos>
          {data?.data
            .slice(
              COUNT_ELEMENT * currentPage - COUNT_ELEMENT,
              COUNT_ELEMENT * currentPage
            )
            .map((element) => (
              <NavLink to={`/about-crypto/${element.id}`}>
                <Element key={element.id}>
                  {element.id} {element.rank}
                </Element>
              </NavLink>
            ))}
        </WrapperCryptos> */}
      {/* <WrapperNavigatePanetel> */}

      {/* </WrapperNavigatePanetel> */}
      {/* </ContentWrapperStyled> */}
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
