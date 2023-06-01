import { ReactElement } from "react";
import { LoaderArgs, V2_MetaArgs, V2_MetaFunction } from "@remix-run/node";
import { AboutCryptoPage } from "~/pages/AboutCrypto";
import { loadCoin } from "~/server";

export const meta: V2_MetaFunction = (args: V2_MetaArgs) => {
  const param = args.params;
  return [{ title: `About ${param.id}` }];
};

export async function loader(prop: LoaderArgs) {
  return loadCoin(prop);
}

const CryptoDetail = (): ReactElement => {
  return <AboutCryptoPage />;
};

export default CryptoDetail;
