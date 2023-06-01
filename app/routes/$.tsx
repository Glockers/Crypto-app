import { V2_MetaFunction } from "@remix-run/react";
import { ReactElement } from "react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Error page" }];
};

const ErrorPage = (): ReactElement => {
  return <ErrorPage />;
};

export default ErrorPage;
