import { ReactElement, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useGetAllCrypto } from "~/api/query/useGetAllCrypto";
import { ICoin } from "~/api/query/useGetOneCoin";
import { Spinner } from "~/components/Spinner";
import { Table } from "~/components/Table";
import { useTableConfig } from "./useTableConfig";
import { ModalAddingCrypto } from "../Modal";

const ContentContainer = styled.div`
  margin-top: 30px;
`;

export function CointTable(): ReactElement {
  const { data, isLoading } = useGetAllCrypto({ state: "all" });
  const [isOpen, setIsOpen] = useState(false);
  const [choosingData, setChoosingData] = useState<ICoin>();
  const { columns } = useTableConfig(setIsOpen, setChoosingData);
  // useEffect(() => {
  //   console.log(isOpen, choosingData);
  // }, [choosingData]);

  return (
    <ContentContainer>
      <ModalAddingCrypto
        choosingData={choosingData ?? ({} as ICoin)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Table<ICoin>
        dataSource={data!?.data}
        columns={columns}
        countElementOnPage={10}
      />
    </ContentContainer>
  );
}
