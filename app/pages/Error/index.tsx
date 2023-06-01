import { useNavigate } from "@remix-run/react";
import { ReactElement } from "react";
import { ContextError } from "./ContextError";


export const ErrorPage = (): ReactElement => {
  const navigate = useNavigate();
  return <ContextError navigate={navigate} />;
};
