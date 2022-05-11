import styled from "styled-components";

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1px solid white;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.theme.green};
`;

export default StatusDot;
