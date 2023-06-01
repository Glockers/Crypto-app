import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;

  @media (max-width: 400px) {
    padding: 10px;
    width: 100%;
  }
`;

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ children, isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <ModalContainer>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </>
  );
};

export default Modal;
