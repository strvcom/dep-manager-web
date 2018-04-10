import styled from "styled-components";
import { Grid } from "react-virtualized";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 400px;
`;

export const LeftContainerWrapper = styled.div`
  display: flex;
  flex: 0 0 200px;
  flex-direction: column;
`;

export const RightContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const Cell = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${({ bold }) => bold && "font-weight: bold"};
  ${({ greyBg }) => greyBg && "background-color: rgba(0, 0, 0, 0.1)"};
`;

export const HeaderGrid = styled(Grid)`
  width: 100%;
  overflow: hidden !important;
`;

export const LeftGrid = styled(Grid)`
  overflow: hidden !important;
`;

export const BodyGrid = styled(Grid)`
  width: 100%;
`;

export const VersionInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${({ greyBg }) => greyBg && "background-color: rgba(0, 0, 0, 0.1)"};
  color: ${({ status }) => {
    switch (status) {
      case "ok":
        return "green";
      case "major":
        return "red";
      case "minor":
        return "goldenrod";
      case "patch":
        return "grey";
      default:
        return "black";
    }
  }};
`;
