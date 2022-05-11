import { mixinsFlexCenter } from "src/common/styles/mixins";
import styled from "styled-components";

export const SOnboarding = styled.div`
  background-image: url("/images/bg-main.jpg");
  width: 100vw;
  height: 100vh;
  ${mixinsFlexCenter};
  background-size: cover;
  background-position: center;
  overflow: hidden;
  flex-direction: column;
  img {
    border-radius: 10px;
    width: 400px;
  }
  & > p {
    font-weight: 700;
    display: flex;
    align-items: center;
    margin-top: 27px;
    font-size: 30px;
    margin-bottom: 32px;
    color: aqua;
    text-transform: uppercase;
    background: #f0f8ffd6;
    padding: 15px;
    border-radius: 10px;
  }
`;
