import { ReactElement } from "react";
import styled from "styled-components";

const Table = styled.table``;
const TableTitle = styled.thead``;
const TableContent = styled.tbody``;

export function TableMyCoins(): ReactElement {
  return (
    <Table>
      <TableTitle>
        <tr>
          {/* {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))} */}
          <th>Криптовалюта</th>
          <th>Количество</th>
          <th>Управление</th>
        </tr>
      </TableTitle>
      <TableContent></TableContent>
    </Table>
  );
}
