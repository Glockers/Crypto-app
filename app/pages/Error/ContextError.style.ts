import styled from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

export const Layout = styled.div`
  overflow: hidden;
  min-height: 100vh;
`;

export const NotFoundTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const NotFoundText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const NotFoundButton = styled.button`
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  background-color: #0077cc;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0066b3;
  }
`;


