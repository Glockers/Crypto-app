import { ReactElement } from "react";
import { styled } from "styled-components";

const Layout = styled.div`
  overflow: hidden;
  min-height: 100vh;
`;

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

const Container = styled.div`

padding: 1rem;
`;

const SubContainer = styled.div`
  width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;

  display: flex;
`;

const ContainerInfo = styled.div`
        flex: 1 1 350px;
`

const ContainerControl = styled.div`
        flex: 1 1 0%;
`

const CryptoDetail = (): ReactElement => {
    return (
        <Layout>
            <CryptoHeader>CryptoDetail</CryptoHeader>
            <Container>
                <SubContainer>
                    <ContainerInfo>Content</ContainerInfo>
                    <ContainerControl>Control</ContainerControl>
                </SubContainer>
            </Container>
        </Layout>
    );
};

export default CryptoDetail;
