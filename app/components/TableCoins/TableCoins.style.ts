import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 15px -3px !important;
  border: none !important;

  @media (max-width: 500px) {
    overflow-x: auto;
  }

  th,
  td {
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

export const TableWrapper = styled.div`
  @media (max-width: 650px) {
    overflow: overlay;
  }
`;