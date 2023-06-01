import { V2_MetaFunction, json } from "@remix-run/node";
import { HomePage } from "~/pages";
import { loadAllCoins } from "~/server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Main" }];
};

export async function loader() {
  return loadAllCoins();
}

export default function Index() {
  return <HomePage />;
}
