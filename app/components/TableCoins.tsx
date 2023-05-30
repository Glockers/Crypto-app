import { ReactElement, useState } from "react";
import { styled } from "styled-components";
import Pagination from "../shared/Pagination";

export interface ITableColumns<T> {
  title: string;
  dataIndex: keyof T;
  render?: (record: T) => {};
}
interface ITableProps<T> {
  dataSource: T[];
  columns: ITableColumns<T>[];
  countElementOnPage: number;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 15px -3px !important;
  border: none !important;
  th,
  td {
    /* border: 1px solid #ccc; */
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background: rgba(0, 0, 0, 0.05) !important;
    color: rgba(0, 0, 0, 0.95) !important;
    cursor: pointer;
  }
`;

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
                    {column?.render
                      ? (column?.render(row) as any)
                      : (row[column.dataIndex] as any)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </StyledTable>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(
          dataSource ? dataSource.length / countElementOnPage : 1
        )} // Общее количество страниц
        onPageChange={handlePageChange}
      />
    </>
  );
};
