import { ReactElement } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { styled } from "styled-components";

const Title = styled.h2`
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
      <Button onClick={() => setIsOpen(!isOpen)}>close</Button>
    </Modal>
  );
};
