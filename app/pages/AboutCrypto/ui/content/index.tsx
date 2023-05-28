import { Form, useParams } from "@remix-run/react";
import { ReactElement, useState } from "react";
import { styled } from "styled-components";
import { useGetHistoryCoin } from "~/api/query/useGetCryptoHistory";
import Button from "~/components/Button";
import { SmartText } from "~/components/Text";
import { convertTimestampToDate } from "~/utils/convertor/dateConvertor";
import { HistoryChart } from "../chart";

const Container = styled.div`
  padding: 1rem;
`;

const SubContainer = styled.div`
  width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;

  display: flex;
  gap: 10px;
`;

const ContainerInfo = styled.div`
  flex: 1 1 350px;
`;

const ContainerControl = styled.div`
  .control-wrapper {
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    height: 410px;
    border-radius: 13px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 9px;
    overflow: hidden;
    padding: 10px;
    max-width: 100%;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  font-size: 30px;
  flex: 0;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  border-radius: 12px;
  padding: 14px;
  border: 1px solid rgb(236, 239, 241);
  background: rgb(249, 249, 249);
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
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
`;

const CustomForm = styled(Form)`
  flex: 1;
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

type TParams = {
  id: string;
};

export function CoinContent(): ReactElement {
  const { id } = useParams<TParams>();
  const { data: initData } = useGetHistoryCoin({ id: id ?? "" });
  const [countValue, setCountValue] = useState(0);

  const handleCount = (number: any) => {
    setCountValue(number.target.value * 2);
  };

  return (
    <Container>
      <SubContainer>
        <ContainerInfo>
          <HistoryTitle>
            История с {convertTimestampToDate(initData?.data[0].time ?? null)}{" "}
            по{" "}
            {convertTimestampToDate(
              initData?.data[initData?.data.length - 1].time ?? null
            )}
          </HistoryTitle>
          <HistoryChart />
        </ContainerInfo>
        <ContainerControl>
          <div className="control-wrapper">
            <TitleContainer>Добавить в портфель</TitleContainer>
            <CustomForm method="post">
              <FormContainerData>
                <InputContainer>
                  <InputContainetText>Количество</InputContainetText>
                  <Input
                    placeholder="0"
                    type="number"
                    inputMode="decimal"
                    autoComplete="off"
                    name="count"
                    onChange={handleCount}
                  />
                </InputContainer>
                <InputContainer>
                  <InputContainetText>Итоговая стоимость</InputContainetText>
                  <Input disabled={true} value={countValue + "$"} />
                </InputContainer>
              </FormContainerData>
              <ButtonContainer>
                <CustomButtom variant="succsess" type="submit">
                  Добавить
                </CustomButtom>
              </ButtonContainer>
            </CustomForm>
          </div>
        </ContainerControl>
      </SubContainer>
    </Container>
  );
}
