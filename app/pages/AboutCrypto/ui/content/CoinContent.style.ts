import styled from "styled-components";
import Button from "~/shared/Button";
import { SmartText } from "~/shared/Text";

export const Container = styled.div`
  padding: 1rem;
`;

export const SubContainer = styled.div`
  max-width: 1127px;
  margin-left: auto !important;
  margin-right: auto !important;

  display: flex;
  gap: 10px;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const ContainerInfo = styled.div`
  flex: 1 1 350px;
  @media (max-width: 660px) {
    flex: 0;
  }
`;

export const ContainerControl = styled.div`
  .control-wrapper {
    margin-top: 55px;
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    /* height: 410px; */
    border-radius: 13px;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 9px;
    overflow: hidden;
    padding: 10px;
    max-width: 100%;
  }

  @media (max-width: 660px) {
    font-size: 32px;
    .control-wrapper {
      margin-top: 20px;
    }
  }
`;

export const TitleContainer = styled.div`
  text-align: center;
  font-size: 30px;
  flex: 0;
  margin-bottom: 30px;

  @media (max-width: 660px) {
    font-size: 32px;
  }
`;

export const InputContainer = styled.div`
  border-radius: 12px;
  padding: 14px;
  border: 1px solid rgb(236, 239, 241);
  background: rgb(249, 249, 249);
  .text {
    font-size: 24px;
  }
`;

export const Input = styled.input`
  background-color: inherit;
  width: 100%;
  border: 0px;
  font-size: 24px;
  &:focus {
    outline: none;
  }
`;

export const InputContainetText = styled.div`
  font-weight: bold;

  @media (max-width: 660px) {
    font-size: 24px;
    text-align: center;
  }
`;
export const ButtonContainer = styled.div`
  text-align: center;
`;

export const HistoryTitle = styled(SmartText)`
  font-size: 2rem;
  margin-bottom: 30px;
`;

export const CustomButtom = styled(Button)`
  width: 90%;
  font-weight: 600;
  font-size: 24px;
`;

export const FormContainerData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
`;

export const NameCoinCointainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-left: 40px;
  }
  .name {
    margin-right: 20px;
    margin-left: 10px;
  }

  @media (max-width: 660px) {
    font-size: 20px;

    .img {
      margin-left: 0px;
    }
  }
`;