import styled from "styled-components";

export const SInnerSidebar = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 0 24px;
  
  .top {
    padding: 15px;
    display: flex;
    align-items: center;
    .header {
      color: ${(props) => props.theme.theme.text.main};
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
      margin-bottom: 0;
      display: flex;
      & > svg {
        display: none;
        @media (max-width: 991px) {
          display: block;
          margin-right: 4px;
          margin-top: 4px;
        }
      }
    }
    .icons {
      margin-left: auto;
      display: flex;
      margin-right: -4px;
      margin-bottom: -4px;
    }
  }

  .search {
    padding: 5px 15px;
    .ant-input-search {
      border-radius: 4px;
      .ant-input {
        background-color: transparent;
        border-color: ${(props) => props.theme.theme.border};
        color: ${(props) => props.theme.theme.text.main};
      }
    }
  }
`;
