import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CointTitle } from "./ui/title";
import { RoutingComponent } from "./ui/routing";
import { CoinContent } from "./ui/content";
import {
  ICoin,
  IHistoryCrypto,
  useGetCoin,
  useGetHistoryCoin,
  usePortfolioMutation,
} from "~/api";
import { useParams } from "@remix-run/react";
import { Layout } from "./ui/AboutCrypto.style";
import { useNotificationContext } from "~/utils/notification/NotificationContext";

type TParams = {
  id: string;
};

export const AboutCryptoPage = (): ReactElement => {
  const { id } = useParams<TParams>();
  const { data: coin } = useGetCoin({ id: id ?? "" });
  const { data: initData } = useGetHistoryCoin({ id: id ?? "" });
  const { addToPortfolio } = usePortfolioMutation();

  const [count, setCount] = useState<number>();
  const [price, setPrice] = useState<number>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useNotificationContext();

  useEffect(() => {
    setPrice(() => (count ? count * (coin?.data.priceUsd || 0) : 0));
  }, [coin?.data.priceUsd, count]);

  const handleCount = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current) {
        let value = inputRef.current.value;

        value = value.replace(/[^0-9.]/g, "");

        if (isNaN(parseFloat(value))) {
          value = "";
        }

        inputRef.current.value = value;
        setCount(parseFloat(value));
      }
    },
    [coin?.data.priceUsd, count]
  );

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (count && count > 0) {
      addToPortfolio({
        count: count,
        id: id ?? "",
        price: coin!?.data.priceUsd,
      });
      showToast("success", "Криптовалюта добавлена!");
      setCount(0);
      inputRef!.current!.value = "";
    } else {
      showToast("error", "Ошибка ввода формы");
    }
  };

  return (
    <Layout>
      <CointTitle coin={coin?.data ?? ({} as ICoin)} />
      <RoutingComponent />
      <CoinContent
        coin={coin?.data ?? ({} as ICoin)}
        historyCoin={initData ?? ({} as IHistoryCrypto)}
        handleCount={handleCount}
        handleForm={handleForm}
        price={price ?? 0}
        inputRef={inputRef}
      />
    </Layout>
  );
};
