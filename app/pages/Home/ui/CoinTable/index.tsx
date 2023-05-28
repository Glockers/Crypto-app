import { ReactElement } from "react";
import { styled } from "styled-components";
import { useGetAllCrypto } from "~/api/query/useGetAllCrypto";
import { ICoin } from "~/api/query/useGetOneCoin";
import { Spinner } from "~/components/Spinner";
import { Table } from "~/components/Table";
import { columns } from "./table.config";

const ContentContainer = styled.div`
  margin-top: 30px;
`;

export function CointTable(): ReactElement {
  const { data, isLoading } = useGetAllCrypto({ state: "all" });

  return (
    <ContentContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table<ICoin>
          dataSource={data?.data ? data.data : []}
          columns={columns}
          countElementOnPage={10}
        />
      )}
    </ContentContainer>
  );
}
