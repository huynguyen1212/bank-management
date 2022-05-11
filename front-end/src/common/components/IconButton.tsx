import { Tooltip } from "antd";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import styled from "styled-components";

export default function IconButton({
  children,
  onClick,
  tooltipTitle,
  tooltipPosition,
  style
}: {
  children: any;
  onClick?: () => void;
  tooltipTitle?: string;
  tooltipPosition?: TooltipPlacement;
  style?: any
}) {
  return (
    <Tooltip title={tooltipTitle} placement={tooltipPosition}>
      <SIconButton {...{style}} onClick={onClick}>{children}</SIconButton>
    </Tooltip>
  );
}

const SIconButton = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 40px;
  height: 35px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px 4px;
  background-color: ${(props) => props.theme.theme.bg.hover};
`;
