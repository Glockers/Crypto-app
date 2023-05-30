import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import profileImage from "../../public/user-profile.svg";
import { useGetAllCrypto } from "~/api/query/useGetAllCrypto";
import {
  converToProcent,
  convertToNormalNumber,
  getJSXElementProcent,
} from "~/utils/convertor";
import { SmartText } from "../shared/Text";
import {
  getPortfolioCurrentPriceFn,
  getPortfolioPriceFn,
  useGetCostPortfolio,
} from "~/api/query/useGetCostMyPortfolio";

const BasicStyle = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderStyle = styled.header`
  overflow: hidden;
  padding: 20px;
  /* height: 100px; */
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const ProfileStyle = styled.div`
  max-width: 40px;
  max-height: 40px;

  img {
    max-width: 100%;
    max-height: 100%;
  }

  img:hover {
    cursor: pointer;
  }
`;

const CostDifferenceStyle = styled(BasicStyle)``;
const ThreePopularCryptoStyle = styled.div`
  display: flex;
  column-gap: 25px;
  flex-wrap: wrap;
`;

const TextCostDifferenceStyle = styled.div`
  color: ${({ color }: any) => color || "red"};
`;
const ContainerStyled = styled.div`
  display: flex;
  gap: 30px;
  /* flex-wrap: wrap; */
`;

const PopularElement = styled(BasicStyle)`
  display: flex;
  gap: 2px;
`;

const ImageWrapper = styled.div`
  img {
    height: 30px !important;
    width: 30px !important;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 10px;
`;

function calculateProcent(myMoney: number, difference: number) {
  const calculatedValue = (difference / myMoney) * 100;
  if (calculatedValue > 0.01 || calculatedValue < -0.01)
    return converToProcent(calculatedValue);
  else {
    return calculatedValue;
  }
  // Math.fround(difference / myMoney) * 100 > 0.01
  //   ? converToProcent((difference / myMoney) * 100)
  //   : (difference / myMoney) * 100;
}

interface IProps {
  setIsOpen: (value: boolean) => void;
}
const Header = ({ setIsOpen }: IProps): ReactElement => {
  const [myMoney, setMyMoney] = useState(0);
  const [currentMoney, setCurrentMoney] = useState(0);
  const [difference, setDifference] = useState(0);
  const { data: popularCryptos } = useGetAllCrypto({ state: "popular" });
  const { myMoney: money, myCurrentMoney } = useGetCostPortfolio();

  useEffect(() => {
    setMyMoney(convertToNormalNumber(money ?? 0));
    setCurrentMoney(convertToNormalNumber(myCurrentMoney ?? 0));
    setDifference(convertToNormalNumber((myCurrentMoney ?? 0) - (money ?? 0)));
  }, [money, myCurrentMoney]);

  return (
    <HeaderStyle>
      <ContainerStyled>
        <ThreePopularCryptoStyle>
          {popularCryptos?.data.map((element) => {
            return (
              <PopularElement key={element.id}>
                <ImageWrapper>
                  <img src={element.img} />
                </ImageWrapper>
                {element.name}&nbsp;<SmartText color="green">$</SmartText>
                {convertToNormalNumber(element.priceUsd).toLocaleString(
                  "en-US"
                )}
                (
                {getJSXElementProcent(
                  converToProcent(element.changePercent24Hr)
                )}
                )
              </PopularElement>
            );
          })}
        </ThreePopularCryptoStyle>
        <ProfileContainer>
          <CostDifferenceStyle>
            <span>{`${currentMoney.toLocaleString("en-US")} USD`}$</span>
            {difference > 0 ? (
              <TextCostDifferenceStyle color="green">
                +{difference.toLocaleString("en-US")}
              </TextCostDifferenceStyle>
            ) : (
              <TextCostDifferenceStyle>
                {difference.toLocaleString("en-US")}
              </TextCostDifferenceStyle>
            )}
            <span>({myMoney && calculateProcent(myMoney, difference)}%)</span>
          </CostDifferenceStyle>
          <ProfileStyle onClick={() => setIsOpen(true)}>
            <img src={profileImage} alt="My Image" />
          </ProfileStyle>
        </ProfileContainer>
      </ContainerStyled>
    </HeaderStyle>
  );
};

export default Header;
