import { useNavigate } from "@remix-run/react";
import { ReactElement } from "react";
import { styled } from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;


const Layout = styled.div`
  overflow: hidden;
  min-height: 100vh;
`;


const NotFoundTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const NotFoundText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const NotFoundButton = styled.button`
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


const ErrorPage = (): ReactElement => {
    const navigate = useNavigate();

    return (
        <Layout>
            <NotFoundContainer>
                <NotFoundTitle>Страница не найдена</NotFoundTitle>
                <NotFoundText>К сожалению, запрашиваемая страница не существует.</NotFoundText>
                <NotFoundButton onClick={event => navigate(-1)}>Вернуться на назад</NotFoundButton>
            </NotFoundContainer>
        </Layout>
    )
}

export default ErrorPage;