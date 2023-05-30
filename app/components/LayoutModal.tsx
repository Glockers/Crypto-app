import { ReactElement } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { styled } from "styled-components";
import { TableMyCoins } from "./TableMyCoins";

const Title = styled.h2`
  text-align: center;
  margin: 0;
`;

const ControlWrapper = styled.div`
  text-align: center;
`;

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const LayoutModal = ({ isOpen, setIsOpen }: IProps): ReactElement => {
  return (
    <Modal isOpen={isOpen}>
      <Title>Мой портфель</Title>
      <TableMyCoins />
      <ControlWrapper>
        <Button onClick={() => setIsOpen(!isOpen)}>Закрыть</Button>
      </ControlWrapper>
    </Modal>
  );
};
