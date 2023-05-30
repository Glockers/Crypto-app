import { ReactElement } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { styled } from "styled-components";
import { TableMyCoins } from "./TableMyCoins/TableMyCoins";

const Title = styled.h2`
  text-align: center;
  margin: 0;
`;


interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const LayoutModal = ({ isOpen, setIsOpen }: IProps): ReactElement => {
  return (
    <Modal isOpen={isOpen}>
      <Title>Мой портфель</Title>
      <TableMyCoins/>
      <Button onClick={() => setIsOpen(!isOpen)}>Закрыть</Button>
    </Modal>
  );
};
