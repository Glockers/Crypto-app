import React, { ButtonHTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Дополнительные свойства кнопки, если необходимо
  variant?: "primary" | "secondary" | "succsess" | "error";
}

const StyledButton = styled.button<ButtonProps>`
  /* Стили кнопки */
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
  /* Стили в зависимости от варианта */
  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: #007bff;
          color: #fff;
        `;
      case "secondary":
        return `
          background-color: #6c757d;
          color: #fff;
        `;
      case "succsess":
        return `
          background-color: rgb(24, 198, 131);
          color: #fff;
        `;
      case "error":
        return `
          background-color: red;
          color: #fff;
        `;
      default:
        return "";
    }
  }}

  &:active {
    transform: scale(0.9);
  }
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
