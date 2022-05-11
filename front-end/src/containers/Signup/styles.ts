import styled from "styled-components";

export const SSignup = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/images/bg-main.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 15px;

  overflow-y: auto;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 40px;
    border-radius: 8px;
    border: 1px solid #e6e6e5;
    @media(max-width: 767px) {
      padding: 20px;
    }
  }
`;

export const SLogo = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 8px;
  background-color: #1890ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`