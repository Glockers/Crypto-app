import { ReactElement } from "react";
import { CointTable } from "./ui/CoinTable";
import { useGetAllCrypto } from "~/api/query/useGetAllCrypto";
import { Text, Container } from "./ui/HomePage.style";

export const HomePage = (): ReactElement => {
  const { data: coinsResponse } = useGetAllCrypto({ state: "all" });

  return (
    <Container>
      <Text>Страница криптовалют</Text>
      <CointTable coins={coinsResponse?.data ?? []} />
    </Container>
  );
};
