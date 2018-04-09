import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const LeftContainerWrapper = styled.div`
  display: flex;
  flex: 0 0 200px;
  flex-direction: column;
`;

export const VersionInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
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
