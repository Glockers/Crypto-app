import { ReactElement, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
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
import { V2_MetaArgs, V2_MetaFunction } from "@remix-run/node";
import { useGetHistoryCoin } from "~/api/query/useGetCryptoHistory";
import { useParams } from "@remix-run/react";
import { convertTimestampToDate } from "~/utils/convertor/dateConvertor";
import { SmartText } from "~/components/Text";
import Button from "~/components/Button";
import useToast from "~/components/Toast";

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
`;

const ContainerInfo = styled.div`
  flex: 1 1 350px;
`;

const ContainerControl = styled.div`
  flex: 1 1 0%;
  height: 410px;
  border-radius: 13px;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 9px;
  overflow: hidden;
  padding: 10px;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
    text-align: center;
    font-size: 30px;
`

const InputContainer = styled.div`
    border-radius: 12px;
    padding: 14px;
    border: 1px solid rgb(236, 239, 241);
    background: rgb(249, 249, 249);
`

const Input = styled.input`
    background-color: inherit;
  width:100%;
  border: 0px;
  font-size: 24px;
  &:focus{
    outline: none;
    
  }
`

const InputContainetText = styled.div`
    font-weight: bold;

`
const ButtonContainer = styled.div`
    text-align: center;
`




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
    plugins: {
        legend: {
            // position: 'top' as const,
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





const CryptoDetail = (): ReactElement => {
    const { id } = useParams<TParams>();
    const { data: initData } = useGetHistoryCoin({ id: id ?? "" });
    const { showToast, ToastContainer } = useToast();

    // const handleShowToast = () => {
    //     showToast('success', 'Toast tester');
    // };
    const data = useMemo(() => {

        return {
            labels: initData?.data.map((el) => convertTimestampToDate(el.time)),
            datasets: [
                {
                    fill: true,
                    data: initData?.data.map((el) => el.priceUsd),
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
            ],
        };
    }, [initData]);
    return (
        <Layout>
            <CryptoHeader>CryptoDetail</CryptoHeader>
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
                        <Line options={options} data={data} />
                    </ContainerInfo>
                    <ContainerControl>
                        <TitleContainer>Добавить в портфель</TitleContainer>
                        <div>
                            <InputContainer>
                                <InputContainetText>
                                    Количество
                                </InputContainetText>
                                <Input placeholder="0" type="number" inputMode="decimal" autoComplete="off" />
                            </InputContainer>
                            <InputContainer>
                                <InputContainetText>
                                    Итоговая стоимость
                                </InputContainetText>
                                <Input placeholder="0" type="number" inputMode="decimal" autoComplete="off" />
                            </InputContainer>
                        </div>
                        <ButtonContainer><Button>Добавить</Button></ButtonContainer>
                    </ContainerControl>
                </SubContainer>
            </Container>
            {ToastContainer}
        </Layout>
    );
};

export default CryptoDetail;
