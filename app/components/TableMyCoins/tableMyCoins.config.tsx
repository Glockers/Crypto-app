import Button from "~/shared/Button";
import { ITableColumns } from "~/components/TableCoins/TableCoins";
import { IPortfolio } from "~/api/query/useGetPortfolio";

export const useTableMyCoinsConfig = (clearCoin: Function) => {
  const columns: ITableColumns<IPortfolio>[] = [
    { title: "ID", dataIndex: "id" },
    { title: "Клдичество", dataIndex: "count" },
    {
      title: "Control",
      dataIndex: "id",
      render(record) {
        return (
          <Button
            variant="error"
            onClick={() => {
              clearCoin({ id: record.id });
            }}
          >
            Убрать
          </Button>
        );
      },
    },
  ];

  return { columns };
};
