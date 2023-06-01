import { V2_MetaFunction } from "@remix-run/react";
import { ReactElement } from "react";
import { ErrorPage } from "~/pages";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Error page" }];
};

const Error = (): ReactElement => {
  return <ErrorPage />;
};

export default Error;
