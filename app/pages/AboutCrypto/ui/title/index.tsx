import { ReactElement } from "react";
import styled from "styled-components";

const CryptoHeader = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(63, 81, 181),
    rgb(100, 181, 246)
  );
  width: calc(100% + 2px);
  max-width: calc(100% + 2px);
  padding: 2rem;
`;

const HeaderContainer = styled.div`
  margin: auto;
  max-width: calc(1127px + 2rem);
`;

export function CointTitle(): ReactElement {
  return (
    <CryptoHeader>
      <HeaderContainer>CryptoDetail</HeaderContainer>
    </CryptoHeader>
  );
}
