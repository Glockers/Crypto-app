import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styled from "styled-components";

// export const meta: V2_MetaFunction = () => {
//   return [{ title: "New Remix App" }];
// };

const Container = styled.div`
  height: 100vh;
`

export default function Index() {

  return (
    <Container>

      <Link to={"/my-cabinet"}>Go to demo page</Link>
    </Container>
  );
}
