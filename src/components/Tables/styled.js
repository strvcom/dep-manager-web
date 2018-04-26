import styled from "styled-components";

export const Wrapper = styled.section`
  margin-top: 60px;
  flex: 1 1 auto;
`;

export const Status = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 2px;

  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  ${({ count }) => !count && "text-decoration: line-through"};
`;

export const Outdated = Status.extend`
  ${({ count }) =>
    count &&
    `
    background-color: #ffd1d9;
    color: #ef0d33;
  `};
`;

export const Alerts = Status.extend`
  ${({ count }) =>
    count &&
    `
    background-color: #ffefbb;
    color: #c2950b;
  `};
`;
