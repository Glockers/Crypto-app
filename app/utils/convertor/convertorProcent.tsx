import { ReactElement } from "react";
import { SmartText } from "~/components/Text";

export function converToProcent(
  number: number,
  fractionDigits: number = 2
): number {
  return parseFloat(((number * 100) / 100).toFixed(fractionDigits));
}

export function convertToNormalNumber(number: number): number {
  return Math.floor(number * 100) / 100;
}

export function getJSXElementProcent(number: number): ReactElement {
  if (number >= 0) {
    return <SmartText color="rgb(24, 198, 131)">+{number}%</SmartText>;
  }
  return <SmartText color="red">{number}%</SmartText>;
}
