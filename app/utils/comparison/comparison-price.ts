export const comparisonPrice = (price1: number, price2: number): boolean => {
    return Math.fround(price1) <= Math.fround(price2)
}