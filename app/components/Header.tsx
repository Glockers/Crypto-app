import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import profileImage from "../../public/user-profile.svg";
import { crypto_api } from "~/utils/api/config";
import { CoinCapAssetsResponse } from "~/routes/_index";
import { useFetcher, useLoaderData } from "@remix-run/react";

const BasicStyle = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderStyle = styled.header`
  overflow: hidden;
  padding: 20px;
  height: 100px;
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
  gap: 25px;
`;

const TextCostDifferenceStyle = styled.div`
  color: ${({ color }: any) => color || "red"};
`;
const ContainerStyled = styled.div`
  display: flex;
  gap: 30px;
`;

const PopularElement = styled(BasicStyle)``;





const Header = (): ReactElement => {
  const [myMoney, setMyMoney] = useState(134.32);
  const [cost, setCost] = useState(2.38);

  const [data, setData] = useState<CoinCapAssetsResponse>();

  useEffect(() => {
    crypto_api.get<CoinCapAssetsResponse>("/assets?limit=10").then(el => setData(el.data))
  }, []);

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <HeaderStyle>
      <ContainerStyled>
        <ThreePopularCryptoStyle>
          {/* <PopularElement>{result2[0].id}</PopularElement>
          <PopularElement>{result2[1].id}</PopularElement>
          <PopularElement>{result2[2].id}</PopularElement> */}
        </ThreePopularCryptoStyle>
        <CostDifferenceStyle>
          {`${myMoney} USD`}$
          {cost > 0 ? (
            <TextCostDifferenceStyle color="green">
              +({cost})%
            </TextCostDifferenceStyle>
          ) : (
            <TextCostDifferenceStyle> ({cost})%</TextCostDifferenceStyle>
          )}
        </CostDifferenceStyle>

        <ProfileStyle>
          <img src={profileImage} alt="My Image" />
        </ProfileStyle>
      </ContainerStyled>
    </HeaderStyle>
  );
};

export default Header;
