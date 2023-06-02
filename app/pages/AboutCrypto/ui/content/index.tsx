import { Form } from "@remix-run/react";
import {

  ChangeEvent,
  FormEvent,
  ReactElement,
  RefObject,

} from "react";
import { convertTimestampToDate } from "~/utils/convertor/dateConvertor";
import { HistoryChart } from "../chart";
import { convertToNormalNumber } from "~/utils";
import { ICoin, IHistoryCrypto } from "~/api";
import { ButtonContainer, Container, ContainerControl, ContainerInfo, CustomButtom, FormContainerData, HistoryTitle, Input, InputContainer, InputContainetText, NameCoinCointainer, SubContainer, TitleContainer } from "./CoinContent.style";


interface ICoinContent {
  coin: ICoin,
  historyCoin: IHistoryCrypto,
  price: number,
  handleCount: (event: ChangeEvent<HTMLInputElement>) => void;
  handleForm: (event: FormEvent<HTMLFormElement>) =>void;
  inputRef: RefObject<HTMLInputElement>;
}

export function CoinContent({ coin, historyCoin, price, handleCount, handleForm, inputRef }: ICoinContent): ReactElement {
  return (
    <Container>
      <SubContainer>
        <Content coin={coin} historyCoin={historyCoin} />
        <Control price={price} handleCount={handleCount} handleForm={handleForm} inputRef={inputRef}/>
      </SubContainer>
    </Container>
  );
}

const Content = ({ coin, historyCoin }: Pick<ICoinContent, "coin" | "historyCoin">): ReactElement => {
  return (
    <ContainerInfo>
      <HistoryTitle>
        <NameCoinCointainer>
          <img className="img" src={coin.img} alt="symbol" />
          <div className="name">
            <span>
              {coin.name}({coin.symbol})
            </span>
          </div>
          <div>
            {convertTimestampToDate(historyCoin?.data[0].time ?? null)} по{" "}
            {convertTimestampToDate(
              historyCoin?.data[historyCoin?.data.length - 1].time ?? null
            )}
          </div>
        </NameCoinCointainer>
      </HistoryTitle>
      <HistoryChart initData={historyCoin!} />
    </ContainerInfo>
  )
}

const Control = ({handleForm,inputRef, handleCount, price } : Pick<ICoinContent, "price" | "handleCount" | "handleForm" | "inputRef">): ReactElement => {
  return (
    <ContainerControl>
      <div className="control-wrapper">
        <TitleContainer>Добавить в портфель</TitleContainer>
        <Form method="post" onSubmit={handleForm}>
          <FormContainerData>
            <InputContainer>
              <InputContainetText>Количество</InputContainetText>
              <Input
                ref={inputRef}
                placeholder="0"
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                onChange={handleCount}
              />
            </InputContainer>
            <InputContainer>
              <InputContainetText>Итоговая стоимость</InputContainetText>
              <span className="text">
                {convertToNormalNumber(price || 0) + "$"}
              </span>
            </InputContainer>
          </FormContainerData>
          <ButtonContainer>
            <CustomButtom variant="succsess" type="submit">
              Добавить
            </CustomButtom>
          </ButtonContainer>
        </Form>
      </div>
    </ContainerControl>
  )
}
