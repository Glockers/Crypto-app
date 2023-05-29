import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { usePortfolioMutation } from "~/api/mutation/usePortfolioMutation";
import { ICoin } from "~/api/query/useGetOneCoin";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import useToast from "~/components/Toast";
import { useNotificationContext } from "~/utils/notification/NotificationContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  background-color: rgb(249, 249, 249);
  border: 1px solid rgb(236, 239, 241);
  width: 100%;
  border: 0px;
  font-size: 24px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 32px;
  text-align: center;
`;

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  choosingData: ICoin;
}

export function ModalAddingCrypto({
  isOpen,
  setIsOpen,
  choosingData,
}: IProps): ReactElement {
  const [count, setCount] = useState<number>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addToPortfolio } = usePortfolioMutation();
  const { showToast } = useNotificationContext();

  const handleCount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        let value = inputRef.current.value;

        value = value.replace(/[^0-9.]/g, "");

        if (isNaN(parseFloat(value))) {
          value = "";
        }

        inputRef.current.value = value;
        setCount(parseFloat(value));
      }
    },
    [count]
  );

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Title>
          Добавить {choosingData.name}({choosingData.symbol})
        </Title>
        <ContentContainer>
          <Label>
            Укажите кол-во
            <Input
              type="text"
              ref={inputRef}
              placeholder="0"
              pattern="^[0-9]*[.,]?[0-9]*$"
              onChange={handleCount}
            />
          </Label>
        </ContentContainer>
        <ControlContainer>
          <Button variant="error" onClick={() => setIsOpen(false)}>
            Отменить
          </Button>
          <Button
            variant="succsess"
            onClick={() => {
              addToPortfolio({ count: count ?? 0, id: choosingData.id });
              showToast("success", "Добавлено");
              setIsOpen(false);
            }}
          >
            Добавить
          </Button>
        </ControlContainer>
      </Container>
    </Modal>
  );
}
