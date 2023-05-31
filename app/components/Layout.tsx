import { ReactElement, ReactNode, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import { LayoutModal } from "./LayoutModal";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Main = styled.main``;

type TLayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: TLayoutProps): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Container>
      <Header setIsOpen={setIsOpen} />
      <Main>{children}</Main>
      <LayoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Container>
  );
};

export default Layout;
