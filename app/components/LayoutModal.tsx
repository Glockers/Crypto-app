import { ReactElement } from "react";
import Modal from "./Modal";
import Button from "./Button";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const LayoutModal = ({ isOpen, setIsOpen }: IProps): ReactElement => {
  return (
    <Modal isOpen={isOpen}>
      <h1>test</h1>
      <Button onClick={() => setIsOpen(!isOpen)}>close</Button>
    </Modal>
  );
};
