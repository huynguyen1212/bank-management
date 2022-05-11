import styled from "styled-components";

export const SSidebar = styled.div<{ open: boolean }>`
  width: calc(100% - 200px);
  height: 100%;
  background-color: ${(props) => props.theme.theme.bg.main};
  transition: 0.2s;

  @media (max-width: 991px) {
    position: fixed;
    right: ${(props) => (props.open ? "0px" : "-300px")};
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: 6;
  }
`;
