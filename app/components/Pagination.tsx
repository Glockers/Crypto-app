import { FC, ReactElement } from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  margin: 0 5px;
  background-color: ${(props) => (props.isActive ? "#333" : "#ccc")};
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}): ReactElement => {
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PageButton
          key={i}
          isActive={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </PageButton>
      );
    }
    return buttons;
  };

  return <PaginationWrapper>{renderPageButtons()}</PaginationWrapper>;
};

export default Pagination;
