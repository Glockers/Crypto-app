import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from "react";
import { useNotificationContext } from "~/utils/notification/NotificationContext";
import { Container, CustomModal, Title } from "./ModalAddingCrypto.style";
import {
  ModalAddingContent,
  ModalAddingControl,
} from "./ModalAddingCrypto.context";
import { ICoin, usePortfolioMutation } from "~/api";

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
  const { addToPortfolio } = usePortfolioMutation();
  const { showToast } = useNotificationContext();

  const inputRef = useRef<HTMLInputElement | null>(null);

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
    <CustomModal isOpen={isOpen}>
      <Container>
        <Title>
          Добавить {choosingData.name}({choosingData.symbol})
        </Title>
        <ModalAddingContent handleCount={handleCount} inputRef={inputRef} />
        <ModalAddingControl
          choosingData={choosingData}
          count={count ?? 0}
          setIsOpen={setIsOpen}
          showToast={showToast}
          addToPortfolio={addToPortfolio}
        />
      </Container>
    </CustomModal>
  );
}
