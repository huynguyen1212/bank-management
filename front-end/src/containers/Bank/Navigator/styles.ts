import styled, { css } from "styled-components";

export const SNavigator = styled.div`
  color: ${(props) => props.theme.theme.logo};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
  min-width: 80px;
  border-right: ${(props) => `1px solid ${props.theme.theme.border}`};
  padding: 15px;
  min-height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  background-color: ${(props) => props.theme.theme.bg.main};

  @media (max-width: 991px) {
    border: none;
  }

  @media (max-width: 575px) {
    width: 50px;
    min-width: 60px;
    padding: 15px 5px;
  }

  .logo {
    margin-bottom: 20px;
  }
  .list {
    flex-grow: 1;
  }
`;

export const SHandleButton = styled.div<{ active: boolean }>`
  width: 200px;
  height: 35px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.active ? props.theme.theme.bg.icon : "transparent"};
  transition: 0.2s;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  margin: 15px 0;
  ${(props) =>
    !props.active &&
    css`
      &:hover {
        background-color: ${(props) => props.theme.theme.bg.hover};
      }
    `}

  .img {
    font-size: 16px;
  }
`;
