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
import { useGetCostPortfolio } from "~/api/query/useGetCostMyPortfolio";

const Flex = styled.div`
  display: flex;
  /* align-items: center; */
`;

const HeaderStyle = styled.header`
  overflow: hidden;
  padding: 20px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  @media (max-width: 1100px) {
    flex-direction: column;
  }

  @media (max-width: 260px) {
    font-size: 12px;
  }

  /* @media (max-width: 960px) {
    justify-content: center;
  } */
`;

const ProfileStyle = styled.div`
  width: 40px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
  }

  img:hover {
    cursor: pointer;
  }
`;

const CostDifferenceStyle = styled(Flex)`
  align-items: center;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const ThreePopularCryptoStyle = styled(Flex)`
  column-gap: 25px;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const TextCostDifferenceStyle = styled.div`
  color: ${({ color }: any) => color || "red"};
`;
const ContainerStyled = styled(Flex)`
  gap: 30px;
  justify-content: space-between;

  @media (max-width: 500px) {
    /* align-items: center; */
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const PopularElement = styled(Flex)`
  align-items: center;
  gap: 2px;
`;

const ImageWrapper = styled.div`
  img {
    height: 30px !important;
    width: 30px !important;
  }
`;

const ProfileContainer = styled(Flex)`
  gap: 10px;

  @media (max-width: 960px) {
    align-items: center;
  }
`;

const DiffrenceWrapper = styled(Flex)``;

function calculateProcent(myMoney: number, difference: number) {
  const calculatedValue = (difference / myMoney) * 100;
  if (calculatedValue > 0.01 || calculatedValue < -0.01)
    return converToProcent(calculatedValue);
  else {
    return calculatedValue;
  }
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
            <DiffrenceWrapper>
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
            </DiffrenceWrapper>{" "}
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
