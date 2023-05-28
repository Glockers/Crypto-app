import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

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
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  width: 100%;
`;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: blue;
//   color: white;
//   border: none;
//   cursor: pointer;
// `;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const Modal = ({ children }: any) => {
  // const [quantity, setQuantity] = useState('');

  // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setQuantity(e.target.value);
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log('Submitted quantity:', quantity);
  //     onClose();
  // };

  // if (!isOpen) return null;

  return (
    <ModalContainer>
      <ModalContent>
        {children}
        {/* <h2> Введите количество </h2>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label>Количество:</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </InputContainer>
                    <ControlWrapper>
                        <Button type="submit">Добавить</Button>
                        <Button onClick={onClose}>Отменить</Button>
                    </ControlWrapper>
                </form> */}
      </ModalContent>
    </ModalContainer>
  );
};

// const Modal = ({ children }: any) => {

//     return (
//         <ModalContainer>
//             <ModalContent>
//                 {/* <h2> Введите количество </h2>
//                 <form onSubmit={handleSubmit}>
//                     <InputContainer>
//                         <Label>Количество:</Label>
//                         <Input
//                             type="number"
//                             step="0.01"
//                             value={quantity}
//                             onChange={handleQuantityChange}
//                         />
//                     </InputContainer>
//                     <ControlWrapper>
//                         <Button type="submit">Добавить</Button>
//                         <Button onClick={onClose}>Отменить</Button>
//                     </ControlWrapper>
//                 </form> */}
//             </ModalContent>
//         </ModalContainer>
//     );
// };
export default Modal;
