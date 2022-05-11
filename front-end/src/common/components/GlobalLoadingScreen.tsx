import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { GlobalLoadingContext } from "../context/GlobalLoadingContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GlobalLoadingScreen() {
  const { isLoading } = useContext(GlobalLoadingContext);

  if (!isLoading) return <></>;

  return (
    <SLoading>
      <span className="spinner">
        <AiOutlineLoading3Quarters size={30} />
      </span>
    </SLoading>
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`

const SLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.theme.bg.main};
  .spinner {
    width: 30px;
    height: 30px;
    animation: ${rotate} linear infinite 1s;
    svg path {
      fill: ${(props) => props.theme.theme.logo};
    }
  }
`;
