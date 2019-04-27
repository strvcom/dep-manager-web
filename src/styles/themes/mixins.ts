import { css } from 'styled-components'

export const palette = {
  black: '#111517',
  white: '#ffffff',
  offWhite: '#f5f5f5',
  red: '#ef0d33',
  palePink: '#ffd1d9',
  eggShell: '#ffefbb',
  ocher: '#c2950b',
}

export const typography = {
  title: css`
    font-family: MaisonNeue-Book, sans-serif;
    font-size: 32px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  subtitle: css`
    font-family: MaisonNeue-Book, sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  caption: css`
    font-family: MaisonNeue-Demi, sans-serif;
    font-size: 11px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  body: css`
    font-family: MaisonNeue-Book, sans-serif;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  tag: css`
    font-family: MaisonNeue-Demi, sans-serif;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-transform: uppercase;
  `,
}

export default interface ITheme {
  backgroundColor?: string
  primaryColor?: string
  primaryColorAccent?: string
  secondaryColor?: string
  secondaryColorAccent?: string
}
