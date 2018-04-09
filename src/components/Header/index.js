// @flow
import React from "react";
import styled from "styled-components";

type Viewer = {
  login: string,
  name: string,
  avatarUrl: string
};

const StyledHeader = styled.header`
  display: flex;
  border: 1px solid black;
  padding: 10px;
`;

const Username = styled.span`
  margin-right: 10px;
`;

const Header = ({
  viewer,
  onLogout
}: {
  viewer: Viewer,
  onLogout: Function
}) => {
  return (
    <StyledHeader>
      <Username>{viewer.login}</Username>
      <button onClick={onLogout}>Log out</button>
    </StyledHeader>
  );
};

export default Header;
