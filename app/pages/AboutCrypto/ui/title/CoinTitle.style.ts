import styled from "styled-components";

export const CryptoHeader = styled.div`
  background-image: linear-gradient(
    to right,
    rgb(63, 81, 181),
    rgb(100, 181, 246)
  );
  width: 100%;
  max-width: 100%;
  padding: 2rem;
`;

export const HeaderContainer = styled.div`
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

export const RankStyle = styled.div`
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

export const InfoCoinStyle = styled.div`
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

export const SupplyContainer = styled.div`
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