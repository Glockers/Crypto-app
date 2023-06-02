import { ReactElement, ReactNode, useState } from "react";
import Pagination from "~/shared/Pagination";
import { StyledTable, TableWrapper } from "./TableCoins.style";

export interface ITableColumns<T> {
  title: string;
  dataIndex: keyof T;
  render?: (record: T) => ReactNode;
}

interface ITableProps<T> {
  dataSource: T[];
  columns: ITableColumns<T>[];
  countElementOnPage: number;
}

export const Table = <T extends { id: string | number }>({
  columns,
  countElementOnPage,
  dataSource,
}: ITableProps<T>): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataSource
              .slice(
                countElementOnPage * currentPage - countElementOnPage,
                countElementOnPage * currentPage
              )
              .map((row, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      {column.render
                        ? column.render(row)
                        : (row[column.dataIndex] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onChangePage={handlePageChange}
      />
    </>
  );
};
