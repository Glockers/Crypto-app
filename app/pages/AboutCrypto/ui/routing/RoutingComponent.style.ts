import styled from "styled-components";
import Button from "~/shared/Button";

export const Container = styled.div`
  max-width: 1127px;
  margin: auto;
  padding: 10px 20px;
`;

export const CustomButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 5px;

  img {
    width: 16px;
    height: 16px;
  }
`;