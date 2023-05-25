import { ReactElement } from "react";
import { styled } from "styled-components";
import { SmartText } from "~/components/Text";


export function converToProcent(number: number, fractionDigits: number = 2): number {
    return parseFloat(((number * 100) / 100).toFixed(fractionDigits))
}

export function convertToNormalNumber(number: number): number {
    return Math.floor(number * 100) / 100
}

export function getJSXElementProcent(number: number): ReactElement {
    if (number >= 0) {
        return (
            <SmartText color="green">+{number}%</SmartText>
        )
    }
    return <SmartText color="red" >{number}%</SmartText>
}