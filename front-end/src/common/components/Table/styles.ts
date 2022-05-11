import { mixinsScrollBar1, mixinsTextOverflow } from "src/common/styles/mixins";
import theme from "src/common/styles/theme";
import styled from "styled-components";
export const TableStyles = styled.div`
  font-size: 14px;
  line-height: 16px;
  position: relative;

  .table-content {
    overflow: auto;

    ${mixinsScrollBar1};

    table {
      width: 100%;
      border-collapse: collapse;
      thead {
        th {
          padding: 5px 12px 7px;
          font-weight: 500;
          white-space: nowrap;
          text-align: center;
          font-size: 14px;
          line-height: 18px;
          color: ${theme.color.text_color};
        }
      }
      tbody {
        tr {
          border-radius: 4px;
          overflow: hidden;
          border-bottom: 8px solid transparent;
          border-top: 8px solid transparent;
          cursor: pointer;
          &.active,
          &:hover {
            filter: drop-shadow(0px 4px 25px rgba(141, 171, 255, 0.2));
            td {
              background-color: #ffffff;
              color: ${theme.color.title_color};
              &:first-child {
                &:after {
                  background-color: ${theme.color.green_color};
                }
              }
            }
          }
          td {
            border-left: 0;
            border-right: 0;
            height: 40px;
            background: rgba(255, 255, 255, 0.8);
            vertical-align: middle;
            text-align: center;
            padding: 0 12px;
            position: relative;
            white-space: nowrap;
            font-size: 14px;
            line-height: 18px;
            color: ${theme.color.text_color};
            a {
              color: #328af1;
              text-decoration: underline;
            }

            &.text-left {
              text-align: left;
            }

            &.text-right {
              text-align: right;
            }

            &:first-child {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              position: relative;
              &:after {
                width: 4px;
                height: 20px;
                content: "";
                background: transparent;
                border-radius: 0px 4px 4px 0px;
                position: absolute;
                background-color: transparent;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            &:last-child {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
            .link {
              color: ${theme.color.title_color};
              text-decoration: underline;
            }

            .status {
              font-size: 14px;
              line-height: 18px;
              &-success {
                color: #03cb83;
              }
              &-waiting {
                color: #ff8a00;
              }
              &-failed {
                color: #eb5757;
              }
            }

            .limit-line {
              ${mixinsTextOverflow(5)};
            }
          }

          td.wrap {
            max-width: 300px;
            white-space: normal;
            overflow-wrap: break-word;
          }
        }
      }
    }
  }
`;
