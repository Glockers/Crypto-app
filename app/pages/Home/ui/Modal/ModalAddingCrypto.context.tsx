import { ChangeEvent, ReactElement, RefObject } from "react";
import {
  ContentContainer,
  ControlContainer,
  Input,
  Label,
} from "./ModalAddingCrypto.style";
import Button from "~/shared/Button";
import { IAddPortolioProps } from "~/api/mutation/usePortfolioMutation";
import { ICoin } from "~/api/query/useGetOneCoin";
import { IShowToast } from "~/shared/Toast";

interface IModalAddingControl {
  setIsOpen: (value: boolean) => void;
  count: number;
  addToPortfolio: (value: IAddPortolioProps) => void;
  choosingData: ICoin;
  showToast: IShowToast;
}

interface IModalAddingContentProps {
  handleCount: (event: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export const ModalAddingControl = ({
  setIsOpen,
  addToPortfolio,
  count,
  choosingData,
  showToast,
}: IModalAddingControl): ReactElement => {
  return (
    <ControlContainer>
      <Button variant="error" onClick={() => setIsOpen(false)}>
        Отменить
      </Button>
      <Button
        variant="succsess"
        onClick={() => {
          addToPortfolio({
            count: count ?? 0,
            id: choosingData.id,
            price: choosingData.priceUsd,
          });
          showToast("success", "Добавлено");
          setIsOpen(false);
        }}
      >
        Добавить
      </Button>
    </ControlContainer>
  );
};

export const ModalAddingContent = ({
  inputRef,
  handleCount,
}: IModalAddingContentProps): ReactElement => {
  return (
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
  );
};
