import { Link } from "@remix-run/react";
import styled from "styled-components";
import { ICoin } from "~/api/query/useGetOneCoin";
import Button from "~/components/Button";
import { ITableColumns } from "~/components/Table";
import {
  converToProcent,
  convertToNormalNumber,
  getJSXElementProcent,
} from "~/utils";

const WrapperNameCrypto = styled.div`
  display: flex;
  gap: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const ImageWrapper = styled.div`
  img {
    height: 30px !important;
    width: 30px !important;
  }
`;

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
          (record.priceUsd > 0.01
            ? convertToNormalNumber(record.priceUsd).toLocaleString("en-US")
            : record.priceUsd)
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
