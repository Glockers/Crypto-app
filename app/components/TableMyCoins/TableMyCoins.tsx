import { ReactElement, useEffect } from "react";
import styled from "styled-components";
import { useGetPortfolio } from "~/api/query/useGetPortfolio";
import { useTableMyCoinsConfig } from "./tableMyCoins.config";
import { usePortfolioMutation } from "~/api/mutation/usePortfolioMutation";
import { Spinner } from "~/shared/Spinner";

const Table = styled.table`
  margin-top: 15px;
  margin-bottom: 20px;
  border-spacing: 20px;
  width: 100%;
`;
const TableTitle = styled.thead``;
const TableContent = styled.tbody``;

const EmptyContainer = styled.div`
  text-align: center;
  font-size: 24px;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const TableWrapper = styled.div`
  max-height: 300px;
  overflow-y: overlay;
`;

export function TableMyCoins(): ReactElement {
  const { data, isLoading } = useGetPortfolio();
  const { removeCoin } = usePortfolioMutation();

  const { columns } = useTableMyCoinsConfig(removeCoin);

  return (
    <TableWrapper>
      {!data || data.length === 0 ? (
        <EmptyContainer>
          <span>Портфель пуст</span>
        </EmptyContainer>
      ) : (
        <Table>
          <TableTitle>
            <tr>
              <th>Криптовалюта</th>
              <th>Количество</th>
              <th>Управление</th>
            </tr>
          </TableTitle>
          <TableContent>
            {isLoading ? (
              <Spinner />
            ) : (
              data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column?.render
                        ? (column?.render(row) as any)
                        : (row[column.dataIndex] as any)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </TableContent>
        </Table>
      )}
    </TableWrapper>
  );
}
