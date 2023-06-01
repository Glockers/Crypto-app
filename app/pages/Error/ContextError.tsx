import { ReactElement } from "react";
import {
  Layout,
  NotFoundButton,
  NotFoundContainer,
  NotFoundText,
  NotFoundTitle,
} from "./ContextError.style";

interface IErrorContextProps {
  navigate: (path: number) => void;
}
export const ContextError = ({
  navigate,
}: IErrorContextProps): ReactElement => {
  return (
    <Layout>
      <NotFoundContainer>
        <NotFoundTitle>Страница не найдена</NotFoundTitle>
        <NotFoundText>
          К сожалению, запрашиваемая страница не существует.
        </NotFoundText>
        <NotFoundButton onClick={(event) => navigate(-1)}>
          Вернуться на назад
        </NotFoundButton>
      </NotFoundContainer>
    </Layout>
  );
};
