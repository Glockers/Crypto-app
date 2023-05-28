import { ReactElement } from "react";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Main = styled.main``;

const Layout = ({ children }: any): ReactElement => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;
