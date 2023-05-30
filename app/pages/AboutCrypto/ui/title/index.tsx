import { useParams } from "@remix-run/react";
import { ReactElement } from "react";
import styled from "styled-components";
import { useGetCoin } from "~/api/query/useGetOneCoin";
import {
  converToProcent,
  convertToNormalNumber,
  getJSXElementProcent,
} from "~/utils";

const CryptoHeader = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(63, 81, 181),
    rgb(100, 181, 246)
  );
  width: 100%;
  max-width: 100%;
  padding: 2rem;
`;

const HeaderContainer = styled.div`
  margin: auto;
  max-width: 1127px;
  padding: 0 1rem;
  display: flex;

  @media (max-width: 950px) {
    flex-direction: column;
    padding: 0px;
    align-items: center;
  }
`;

const RankStyle = styled.div`
  flex: 0;

  .green-container {
    background-color: rgb(24, 198, 131);
    color: white !important;
    font-weight: 600;
    padding: 28px;
    border-radius: 1rem;
    text-align: center;
  }

  .rank-data {
    font-size: 26px;
  }

  .rank {
    font-size: 16px;
  }
`;

const InfoCoin = styled.div`
  flex: 0.5;
  color: white;
  padding: 20px;

  .name-coin {
    font-size: 32px;
  }

  .price-coin-container {
    display: flex;
    gap: 5px;

    /* gap: 20px; */
    /* justify-content: center; */
  }

  @media (max-width: 950px) {
    font-size: 32px;

    .price-coin-container {
      /* gap: 20px; */
      justify-content: center;
    }
  }
`;

const SupplyContainer = styled.div`
  display: flex;
  flex: 1;

  .sub-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    color: white;

    .sub-title {
      font-size: 2rem;
    }

    .sub-data {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  @media (max-width: 950px) {
    font-size: 32px;
  }

  @media (max-width: 500px) {
    font-size: 32px;
    flex-direction: column;
  }
`;

type TParams = {
  id: string;
};

export function CointTitle(): ReactElement {
  const { id } = useParams<TParams>();

  const { data: coin } = useGetCoin({ id: id ?? "" });

  return (
    <CryptoHeader>
      <HeaderContainer>
        <RankStyle>
          <div className="green-container">
            <span className="rank-data">{coin?.data.rank}</span>
            <div className="rank">Rank</div>
          </div>
        </RankStyle>
        <InfoCoin>
          <span className="name-coin">
            {coin?.data.name}({coin?.data.symbol})
          </span>
          <div className="price-coin-container">
            <span>
              {coin!?.data.priceUsd > 0.01 || coin!?.data.priceUsd < -0.01
                ? convertToNormalNumber(coin!?.data.priceUsd)?.toLocaleString(
                    "en-US"
                  )
                : coin!?.data.priceUsd}
              $
            </span>
            <span>
              {getJSXElementProcent(
                converToProcent(coin!?.data.changePercent24Hr)
              )}
            </span>
          </div>
        </InfoCoin>
        <SupplyContainer>
          <div className="sub-container">
            <span className="sub-title">supply</span>
            <span className="sub-data">
              {convertToNormalNumber(Number(coin?.data.supply))?.toLocaleString(
                "en-US"
              )}
            </span>
          </div>
          <div className="sub-container">
            <span className="sub-title">max-supply</span>
            <span className="sub-data">
              {coin?.data.maxSupply
                ? convertToNormalNumber(
                    Number(coin!?.data.maxSupply)
                  )?.toLocaleString("en-US")
                : "Нет данных"}
            </span>
          </div>
        </SupplyContainer>
      </HeaderContainer>
    </CryptoHeader>
  );
}
