import { ReactElement } from "react";
import { CointTitle } from "./ui/title";
import { RoutingComponent } from "./ui/routing";
import { CoinContent } from "./ui/content";
import styled from "styled-components";

// TODO
const Layout = styled.div`
  overflow: hidden;
`;

export const AboutCryptoPage = (): ReactElement => {
  return (
    <Layout>
      <CointTitle />
      <RoutingComponent />
      <CoinContent />
    </Layout>
  );
};
