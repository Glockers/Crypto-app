import type { V2_MetaFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {

  return (
    <>
      <h1>Hello world</h1>
      <Link to={"/my-cabinet"}>Go to demo page</Link>
    </>
    );
}
