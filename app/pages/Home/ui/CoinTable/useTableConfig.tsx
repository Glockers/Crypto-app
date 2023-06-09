import { Link } from "@remix-run/react";
import Button from "~/shared/Button";
import {
  converToProcent,
  convertToNormalNumber,
  getJSXElementProcent,
} from "~/utils";
import { ImageWrapper, WrapperNameCrypto } from "./CoinTable.style";
import { ITableColumns } from "~/components/TableCoins";
import { ICoin } from "~/api";

export const useTableConfig = (
  setModal: Function,
  setChoosingData: Function
) => {
  const columns: ITableColumns<ICoin>[] = [
    { title: "Rank", dataIndex: "rank" },
    {
      title: "Name",
      dataIndex: "name",
      render(record) {
        return (
          <Link to={`/about-crypto/${record.id}`}>
            <WrapperNameCrypto>
              <ImageWrapper>
                <img src={record.img} />
              </ImageWrapper>
              <div>{record.name}</div>
            </WrapperNameCrypto>
          </Link>
        );
      },
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      render(record) {
        return (
          <Link to={`/about-crypto/${record.id}`}>
            <WrapperNameCrypto>{record.symbol}</WrapperNameCrypto>
          </Link>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      render(record) {
        return (
          "$" +
          (record.priceUsd > 0.01 || record.priceUsd < -0.01
            ? convertToNormalNumber(record.priceUsd).toLocaleString("en-US")
            : convertToShortNumber(record.priceUsd))
        );
      },
    },
    {
      title: "Change(24Hr)",
      dataIndex: "changePercent24Hr",
      render(record) {
        return getJSXElementProcent(converToProcent(record.changePercent24Hr));
      },
    },
    {
      title: "Control",
      dataIndex: "id",
      render(record) {
        return (
          <Button
            variant="secondary"
            onClick={() => {
              setModal(true);
              setChoosingData(record);
            }}
          >
            Купить
          </Button>
        );
      },
    },
  ];

  return { columns };
};

function convertToShortNumber(number: number, significantDigits = 2) {
  const power = Math.floor(Math.log10(Math.abs(number)));
  const multiplier = 10 ** (power - significantDigits + 1);
  const roundedNumber = Math.round(number / multiplier) * multiplier;

  return roundedNumber;
}
