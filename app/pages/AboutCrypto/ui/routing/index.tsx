import { NavLink } from "@remix-run/react";
import { ReactElement } from "react";
import styled from "styled-components";
import Button from "~/shared/Button";
import Image from "~/../public/back_83894.svg";
const Container = styled.div`
  max-width: 1127px;
  margin: auto;
  padding: 10px 20px;
`;

const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const RoutingComponent = (): ReactElement => {
  return (
    <Container>
      <NavLink to={"/"}>
        <CustomButton>
          <img src={Image} alt="back" /> Вернуться
        </CustomButton>
      </NavLink>
    </Container>
  );
};
