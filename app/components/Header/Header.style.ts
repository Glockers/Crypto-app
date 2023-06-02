import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  /* align-items: center; */
`;

export const HeaderStyle = styled.header`
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

export const ProfileStyle = styled.div`
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

export const CostDifferenceStyle = styled(Flex)`
  align-items: center;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const ThreePopularCryptoStyle = styled(Flex)`
  column-gap: 25px;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const TextCostDifferenceStyle = styled.div`
  color: ${({ color }) => color || "red"};
`;
export const ContainerStyled = styled(Flex)`
  gap: 30px;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const PopularElement = styled(Flex)`
  align-items: center;
  gap: 2px;
`;

export const ImageWrapper = styled.div`
  img {
    height: 30px !important;
    width: 30px !important;
  }
`;

export const ProfileContainer = styled(Flex)`
  gap: 10px;

  @media (max-width: 960px) {
    align-items: center;
  }
`;