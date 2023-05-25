import { styled } from "styled-components";

interface IText {
    color?: string;
    size?: number;
}

export const SmartText = styled.div<IText>`
  color: ${(props) => props?.color || "black"};
  size: ${(props) => props?.size || 14};
`;
