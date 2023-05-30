import { Form, useParams } from "@remix-run/react";
import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";
import { useGetHistoryCoin } from "~/api/query/useGetCryptoHistory";
import Button from "~/shared/Button";
import { SmartText } from "~/shared/Text";
import { convertTimestampToDate } from "~/utils/convertor/dateConvertor";
import { HistoryChart } from "../chart";
import { useGetCoin } from "~/api/query/useGetOneCoin";
import { convertToNormalNumber } from "~/utils";
import { usePortfolioMutation } from "~/api/mutation/usePortfolioMutation";
import useToast from "~/shared/Toast";

const Container = styled.div`
  padding: 1rem;
`;

const SubContainer = styled.div`
  max-width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;

  display: flex;
  gap: 10px;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const ContainerInfo = styled.div`
  flex: 1 1 350px;
  @media (max-width: 660px) {
    flex: 0;
  }
`;

const ContainerControl = styled.div`
  .control-wrapper {
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    /* height: 410px; */
    border-radius: 13px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 9px;
    overflow: hidden;
    padding: 10px;
    max-width: 100%;
  }

  @media (max-width: 660px) {
    font-size: 32px;
    .control-wrapper {
      margin-top: 20px;
    }
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  font-size: 30px;
  flex: 0;
  margin-bottom: 30px;

  @media (max-width: 660px) {
    font-size: 32px;
  }
`;

const InputContainer = styled.div`
  border-radius: 12px;
  padding: 14px;
  border: 1px solid rgb(236, 239, 241);
  background: rgb(249, 249, 249);
  .text {
    font-size: 24px;
  }
`;

const Input = styled.input`
  background-color: inherit;
  width: 100%;
  border: 0px;
  font-size: 24px;
  &:focus {
    outline: none;
  }
`;

const InputContainetText = styled.div`
  font-weight: bold;
`;
const ButtonContainer = styled.div`
  text-align: center;
`;

const HistoryTitle = styled(SmartText)`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const CustomButtom = styled(Button)`
  width: 90%;
  font-weight: 600;
  font-size: 24px;
`;

const FormContainerData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
`;

const NameCoinCointainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-left: 40px;
  }
  .name {
    margin-right: 20px;
    margin-left: 10px;
  }

  @media (max-width: 660px) {
    font-size: 20px;

    .img {
      margin-left: 0px;
    }
  }
`;

type TParams = {
  id: string;
};

export function CoinContent(): ReactElement {
  const { id } = useParams<TParams>();
  const { data: initData } = useGetHistoryCoin({ id: id ?? "" });
  const { data: coin } = useGetCoin({ id: id ?? "" });
  const [count, setCount] = useState<number>();
  const [price, setPrice] = useState<number>();
  const { ToastContainer, showToast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addToPortfolio, isAdding } = usePortfolioMutation();

  useEffect(() => {
    setPrice(() => (count ? count * (coin?.data.priceUsd || 0) : 0));
  }, [coin?.data.priceUsd, count]);

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
    [coin!.data.priceUsd, count]
  );

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (count && count > 0) {
      addToPortfolio({
        count: count,
        id: id ?? "",
        price: coin!?.data.priceUsd,
      });
      showToast("success", "Криптовалюта добавлена!");
      setCount(0);
      inputRef!.current!.value = "";
    } else {
      showToast("error", "Ошибка ввода формы");
    }
  };

  return (
    <Container>
      <SubContainer>
        <ContainerInfo>
          <HistoryTitle>
            <NameCoinCointainer>
              <img className="img" src={coin?.data.img} alt="symbol" />
              <div className="name">
                <span>
                  {coin?.data.name}({coin?.data.symbol})
                </span>
              </div>
              <div>
                {convertTimestampToDate(initData?.data[0].time ?? null)} по{" "}
                {convertTimestampToDate(
                  initData?.data[initData?.data.length - 1].time ?? null
                )}
              </div>
            </NameCoinCointainer>
          </HistoryTitle>
          <HistoryChart initData={initData!} />
        </ContainerInfo>
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
      </SubContainer>
      {ToastContainer}
    </Container>
  );
}
