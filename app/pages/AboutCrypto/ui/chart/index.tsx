import { ReactElement, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { options } from "./config";
import { convertTimestampToDate } from "~/utils/convertor/dateConvertor";
import { comparisonPrice } from "~/utils";
import { IHistoryCrypto } from "~/api";

interface IProps {
  initData: IHistoryCrypto;
}

export function HistoryChart({ initData }: IProps): ReactElement {
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
  return <Line options={options} data={dataChart} />;
}
