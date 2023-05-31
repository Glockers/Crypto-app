import React from "react";
import styled from "styled-components";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 400px) {
    flex-wrap: wrap;
  }
`;

const PageButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  background-color: ${(props) => (props.isActive ? "blue" : "transparent")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  cursor: ${(props) => (props.isActive ? "default" : "pointer")};

  @media (max-width: 400px) {
    margin: 4px;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChangePage,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onChangePage(page);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    for (let page = 1; page <= totalPages; page++) {
      const isActive = page === currentPage;
      pageButtons.push(
        <PageButton
          key={page}
          isActive={isActive}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageButton>
      );
    }

    return pageButtons;
  };

  return <PaginationContainer>{renderPageButtons()}</PaginationContainer>;
};

export default Pagination;
