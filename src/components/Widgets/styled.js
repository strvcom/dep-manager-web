// @flow
import styled from "styled-components";
import { width, height, space } from "styled-system";

export const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  background: white;
  height: 180px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);

  ${space};
  ${width};
  ${height};
`;

export const WidgetTitle = styled.h1`
  font-family: "Maison Neue";
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`;
