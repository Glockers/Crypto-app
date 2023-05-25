import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // Дополнительные свойства кнопки, если необходимо
    variant?: 'primary' | 'secondary';
}

const StyledButton = styled.button<ButtonProps>`
  /* Стили кнопки */
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  /* Стили в зависимости от варианта */
  ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return `
          background-color: #007bff;
          color: #fff;
        `;
            case 'secondary':
                return `
          background-color: #6c757d;
          color: #fff;
        `;
            default:
                return '';
        }
    }}
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
