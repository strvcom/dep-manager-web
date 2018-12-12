import { css } from '../styled'

export const palette = {
  black: '#111517',
  white: '#ffffff',
  offWhite: '#f5f5f5',
  red: '#ef0d33',
  palePink: '#ffd1d9',
  eggShell: '#ffefbb',
  ocher: '#c2950b'
}

export const typography = {
  title: css`
    font-family: MaisonNeue-Book;
    font-size: 32px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  subtitle: css`
    font-family: MaisonNeue-Book;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  caption: css`
    font-family: MaisonNeue-Demi;
    font-size: 11px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  body: css`
    font-family: MaisonNeue-Book;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  `,
  tag: css`
    font-family: MaisonNeue-Demi;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-transform: uppercase;
  `
}

export default interface Theme {
  backgroundColor?: string
  primaryColor: string
  primaryColorAccent: string
  secondaryColor: string
  secondaryColorAccent: string
}
