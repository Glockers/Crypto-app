import { ReactElement, useEffect } from "react";
import { CoinCapAssetsResponse } from "../_index";
import { crypto_api } from "~/utils/api/config";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
    const assets = (
        await crypto_api.get<CoinCapAssetsResponse>("/assets?limit=5")
    ).data;

    return assets;
}

const AboutCrypto = (): ReactElement => {
    const cryptos = useLoaderData<typeof loader>();

    useEffect(() => {
        console.log("/about-crypto", cryptos);
    }, [cryptos]);
    return (
        <>
            test
        </>
    )

}

export default AboutCrypto