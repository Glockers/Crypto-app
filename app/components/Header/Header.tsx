import { ReactElement, useEffect, useState } from "react";
import profileImage from "~/../public/user-profile.svg";
import {
  converToProcent,
  convertToNormalNumber,
  getJSXElementProcent,
} from "~/utils/convertor";
import { ICoin, useGetAllCrypto, useGetCostPortfolio } from "~/api";
import { SmartText } from "~/shared/Text";
import {
  ContainerStyled,
  CostDifferenceStyle,
  Flex,
  HeaderStyle,
  ImageWrapper,
  PopularElement,
  ProfileContainer,
  ProfileStyle,
  TextCostDifferenceStyle,
  ThreePopularCryptoStyle,
} from "./Header.style";

interface IProps {
  setIsOpen: (value: boolean) => void;
}

interface IThreePopularCryptoProps {
  popularCryptos: Array<ICoin>;
}

interface IProfile {
  myMoney: number;
  currentMoney: number,
  difference: number;
  setIsOpen: (value: boolean) => void;
}

export const Header = ({ setIsOpen }: IProps): ReactElement => {
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
        <ThreePopularCrypto
          popularCryptos={popularCryptos?.data ?? ([] as Array<ICoin>)}
        />
        <Profile
          currentMoney={currentMoney}
          difference={difference}
          myMoney={myMoney}
          setIsOpen={setIsOpen}
        />
      </ContainerStyled>
    </HeaderStyle>
  );
};

const ThreePopularCrypto = ({
  popularCryptos,
}: IThreePopularCryptoProps): ReactElement => {
  return (
    <ThreePopularCryptoStyle>
      {popularCryptos.map((element) => {
        return (
          <PopularElement key={element.id}>
            <ImageWrapper>
              <img src={element.img} />
            </ImageWrapper>
            {element.name}&nbsp;<SmartText color="green">$</SmartText>
            {convertToNormalNumber(element.priceUsd).toLocaleString("en-US")}(
            {getJSXElementProcent(converToProcent(element.changePercent24Hr))})
          </PopularElement>
        );
      })}
    </ThreePopularCryptoStyle>
  );
};

const Profile = ({
  currentMoney,
  difference,
  myMoney,
  setIsOpen,
}: IProfile): ReactElement => {
  return (
    <ProfileContainer>
      <CostDifferenceStyle>
        <span>{`${currentMoney.toLocaleString("en-US")} USD`}$</span>
        <Flex>
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
        </Flex>{" "}
      </CostDifferenceStyle>
      <ProfileStyle onClick={() => setIsOpen(true)}>
        <img src={profileImage} alt="My Image" />
      </ProfileStyle>
    </ProfileContainer>
  );
};

function calculateProcent(myMoney: number, difference: number) {
  const calculatedValue = (difference / myMoney) * 100;
  if (calculatedValue > 0.01 || calculatedValue < -0.01)
    return converToProcent(calculatedValue);
  else {
    return calculatedValue;
  }
}

