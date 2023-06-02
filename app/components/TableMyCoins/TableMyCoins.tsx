import { ReactElement, ReactNode } from "react";
import { useTableMyCoinsConfig } from "./tableMyCoins.config";
import { usePortfolioMutation } from "~/api/mutation/usePortfolioMutation";
import { Spinner } from "~/shared/Spinner";
import { useGetPortfolio } from "~/api";
import {
  EmptyContainer,
  Table,
  TableContent,
  TableTitle,
  TableWrapper,
} from "./TableMyCoins.style";

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
                        ? column?.render(row)
                        : (row[column.dataIndex] as ReactNode)}
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
