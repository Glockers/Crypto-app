export const queryKeys = {
    all: ["all"] as const,
    portfolio: () => [...queryKeys.all, "portfolio"] as const,
    price: () => [...queryKeys.all, "price"] as const,
    myMoney: () => [...queryKeys.price(), "myMoney"] as const,
    currentMoney: () => [...queryKeys.price(), "currentMoney"] as const,
    coins: () => [...queryKeys.all, "coins"] as const,
    kind_of_coins: (key: "all" | "popular") => [...queryKeys.coins(), "coins", key] as const,
    coin: (coinID: string) => [...queryKeys.all, "coin", coinID] as const,
    coin_history: (coinId: string) => [...queryKeys.coin(coinId), "coin/history"] as const,
}
