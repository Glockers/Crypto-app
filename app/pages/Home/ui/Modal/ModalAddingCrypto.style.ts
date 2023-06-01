import styled from "styled-components";
import Modal from "~/shared/Modal";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 400px) {
    flex-wrap: wrap;
    flex-direction: column;
    gap: 8px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label``;

export const Input = styled.input`
  background-color: rgb(249, 249, 249);
  border: 1px solid rgb(236, 239, 241);
  width: 100%;
  border: 0px;
  font-size: 24px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 32px;
  text-align: center;
  @media (max-width: 400px) {
    font-size: 24px;
  }
`;

export const CustomModal = styled(Modal)`
  @media (max-width: 400px) {
    padding: 5px;
  }
`;