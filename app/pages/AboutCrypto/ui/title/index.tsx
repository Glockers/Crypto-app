import { ReactElement } from "react";
import { ICoin } from "~/api";
import {
  converToProcent,
  convertToNormalNumber,
  getJSXElementProcent,
} from "~/utils";
import { CryptoHeader, HeaderContainer, InfoCoinStyle, RankStyle, SupplyContainer } from "./CoinTitle.style";



interface ICointTitleprops {
  coin: ICoin
}

export function CointTitle({ coin }: ICointTitleprops): ReactElement {
  return (
    <CryptoHeader>
      <HeaderContainer>
        <Rank coin={coin} />
        <InfoCoin coin={coin}></InfoCoin>
      </HeaderContainer>
    </CryptoHeader>
  );
}


const Rank = ({ coin }: ICointTitleprops): ReactElement => {
  return (
    <RankStyle>
      <div className="green-container">
        <span className="rank-data">{coin.rank}</span>
        <div className="rank">Rank</div>
      </div>
    </RankStyle>
  )
}

const InfoCoin = ({ coin }: ICointTitleprops): ReactElement => {

  return (
    <>
      <InfoCoinStyle>
        <span className="name-coin">
          {coin.name}({coin.symbol})
        </span>
        <div className="price-coin-container">
          <span>
            {coin.priceUsd > 0.01 || coin.priceUsd < -0.01
              ? convertToNormalNumber(coin.priceUsd)?.toLocaleString(
                "en-US"
              )
              : coin.priceUsd}
            $
          </span>
          <span>
            {getJSXElementProcent(
              converToProcent(coin.changePercent24Hr)
            )}
          </span>
        </div>
      </InfoCoinStyle>
      <SupplyContainer>
        <div className="sub-container">
          <span className="sub-title">supply</span>
          <span className="sub-data">
            {convertToNormalNumber(Number(coin.supply))?.toLocaleString(
              "en-US"
            )}
          </span>
        </div>
        <div className="sub-container">
          <span className="sub-title">max-supply</span>
          <span className="sub-data">
            {coin.maxSupply
              ? convertToNormalNumber(
                Number(coin.maxSupply)
              )?.toLocaleString("en-US")
              : "Нет данных"}
          </span>
        </div>
      </SupplyContainer>
    </>
  )
}