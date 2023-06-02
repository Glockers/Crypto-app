import { NavLink } from "@remix-run/react";
import { ReactElement } from "react";
import Image from "~/../public/back_83894.svg";
import { Container, CustomButton } from "./RoutingComponent.style";


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
