const epsilon = 0.0001; // Задайте значение погрешности по вашему усмотрению


export const comparisonPrice = (price1: number, price2: number): boolean => {

    const leftValue = price1
    const rightValue = price2
    console.log(Math.abs(leftValue - rightValue) <= epsilon)
    return Math.fround(leftValue) <= Math.fround(rightValue)
}