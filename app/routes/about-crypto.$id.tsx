import { ReactElement } from "react";
import { styled } from "styled-components";
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import { V2_MetaArgs, V2_MetaFunction } from "@remix-run/node";


export const meta: V2_MetaFunction = (args: V2_MetaArgs) => {
    const param = args.params
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
`

const ContainerControl = styled.div`
        flex: 1 1 0%;
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
            display: false
        },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            fill: true,
            data: labels.map(() => 1),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};



const CryptoDetail = (): ReactElement => {

    return (
        <Layout>
            <CryptoHeader>CryptoDetail</CryptoHeader>
            <Container>
                <SubContainer>
                    <ContainerInfo>
                        Content
                        <Line options={options} data={data} />
                    </ContainerInfo>
                    <ContainerControl>Control</ContainerControl>
                </SubContainer>
            </Container>
        </Layout>
    );
};

export default CryptoDetail;
