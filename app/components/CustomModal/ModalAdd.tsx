import { useState } from "react";
import Modal from "../Modal"
import { styled } from "styled-components";
import Button from "../Button";


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

const ControlWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const ModalAddCrypto = () => {
    const [quantity, setQuantity] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted quantity:', quantity);
        handleCloseModal();
    };



    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (!modalOpen) return null;
    return (
        <>
            <button onClick={handleOpenModal}>Open Modal</button>
            <Modal >
                <h2> Введите количество </h2>
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
                        <Button onClick={handleCloseModal}>Отменить</Button>
                    </ControlWrapper>
                </form>

            </Modal>
        </>

    )
}

export default ModalAddCrypto