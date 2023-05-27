import { ReactElement, useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import {
  ActionArgs,
  LoaderArgs,
  V2_MetaArgs,
  V2_MetaFunction,
  json,
} from "@remix-run/node";
import {
  getHistoryCoinFn,
  useGetHistoryCoin,
} from "~/api/query/useGetCryptoHistory";
import { Form, useParams } from "@remix-run/react";
import { convertTimestampToDate } from "~/utils/convertor/dateConvertor";
import { SmartText } from "~/components/Text";
import Button from "~/components/Button";
import useToast from "~/components/Toast";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import styled from "styled-components";
import { useGetCoin } from "~/api/query/useGetOneCoin";
import { comparisonPrice } from "~/utils/comparison/comparison-price";

export const meta: V2_MetaFunction = (args: V2_MetaArgs) => {
  const param = args.params;
  return [{ title: `About ${param.id}` }];
};

const Layout = styled.div`
  overflow: hidden;
  min-height: 100vh;
`;

const CryptoHeader = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(63, 81, 181),
    rgb(100, 181, 246)
  );
  width: calc(100% + 2px);
  max-width: calc(100% + 2px);
  padding: 2rem;
`;

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
};

type TParams = {
  id: string;
};

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

const HeaderContainer = styled.div`
  margin: auto;
  max-width: calc(1127px + 2rem);
`;

export async function loader({ params }: LoaderArgs) {
  const queryClient = new QueryClient();
  const id = params?.id ?? "";
  await queryClient.prefetchQuery(["coin/history", id], () =>
    getHistoryCoinFn({ id })
  );
  return json({ dehydratedState: dehydrate(queryClient) });
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const count = form.get("count");
  // const price = form.get("price");
  const fields = { count };
  return fields;
};

const CryptoDetail = (): ReactElement => {
  const { id } = useParams<TParams>();
  const { data: initData } = useGetHistoryCoin({ id: id ?? "" });
  const { data: coin } = useGetCoin({ id: id ?? "" });
  const { showToast, ToastContainer } = useToast();
  // const actionData = useActionData<typeof action>();
  // useEffect(() => {
  //     console.log(actionData)
  // }, [actionData])

  const [countValue, setCountValue] = useState(0);
  const dataChart = useMemo(() => {
    return {
      labels: initData?.data.map((el) => convertTimestampToDate(el.time)),
      datasets: [
        {
          fill: true,
          data: initData?.data.map((el) => el.priceUsd),
          borderColor: comparisonPrice(
            initData!?.data[0].priceUsd,
            initData!?.data[initData?.data.length - 1].priceUsd
          )
            ? "rgb(24, 198, 131)"
            : "red",
          backgroundColor: comparisonPrice(
            initData!?.data[0].priceUsd,
            initData!?.data[initData?.data.length - 1].priceUsd
          )
            ? "rgb(24, 198, 131, 0.4)"
            : "rgb(255,0,0, 0.4)",
        },
      ],
    };
  }, [initData]);

  const handleCount = (number: any) => {
    setCountValue(number.target.value * 2);
  };

  return (
    <Layout>
      <CryptoHeader>
        <HeaderContainer>CryptoDetail</HeaderContainer>
      </CryptoHeader>
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
            <Line options={options} data={dataChart} />
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
      {ToastContainer}
    </Layout>
  );
};

export default CryptoDetail;
