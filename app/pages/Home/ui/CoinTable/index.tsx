import { ReactElement, useState } from "react";
import { Table } from "~/components/TableCoins";
import { useTableConfig } from "./useTableConfig";
import { ModalAddingCrypto } from "../Modal";
import { ContentContainer } from "./CoinTable.style";
import { ICoin } from "~/api";

interface ICoinTableProps {
  coins: Array<ICoin>;
}

export function CointTable({ coins }: ICoinTableProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [choosingData, setChoosingData] = useState<ICoin>();
  const { columns } = useTableConfig(setIsOpen, setChoosingData);

  return (
    <ContentContainer>
      <ModalAddingCrypto
        choosingData={choosingData ?? ({} as ICoin)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Table<ICoin>
        dataSource={coins}
        columns={columns}
        countElementOnPage={10}
      />
    </ContentContainer>
  );
}
