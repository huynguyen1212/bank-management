import { Input, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { STransactionHistory } from "./styles";
import { Table } from "antd";
import { CustomerContext } from "src/common/context/CustomerContext";
import { requestToken } from "src/api/axios";
interface ITable {
  time: any;
  type: any;
  amount: any;
  from: any;
  to: any;
  content: any;
}
export default function TransactionHistory() {
  const { theme } = useContext(ThemeContext);
  const [dataSource, setDataSource] = useState<ITable[]>([]);
  const { toggleSidebar } = useContext(ToggleSidebarContext);
  const [listTransaction, setListTransaction] = useState<any[]>([]);
  const { setCustomer } = useContext(CustomerContext);
  const [listAccount, setListAccount] = useState<any[]>([]);
  const [currentAccount, setCurrentAccount] = useState<any>("");
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Loại giao dịch", //Nạp - gửi - nhận - rút
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tài khoản nguồn",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "Tài khoản đích",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
  ];
  const { Option } = Select;
  useEffect(() => {
    console.log(listTransaction)
    const tempList: ITable[] = [];
    listTransaction.map((item: any, index: any) => {
      tempList.push({
        time: (new Date(item.createdAt)).toLocaleString(),
        type:
          item.type === "IN"
            ? "Nạp tiền"
            : item.type === "OUT"
            ? "Rút tiền"
            : item.account_in.id===currentAccount
            ? "Chuyển khoản đến" : "Chuyển khoản đi",
        amount: item?.amount,
        from: item?.account_out?.code ,
        to: item?.account_in?.code ,
          // item.type === "PAY" ? item?.account_in?.code || item?.account_out?.code : "",
        content: item?.note,
      });
    });
    setDataSource(tempList);
  }, [listTransaction]);

  useEffect(() => {
    requestToken({
      method: "GET",
      url: "/auth/profile",
      // data: values,
    })
      .then((res: any) => {
        setCustomer(res.data.data);
        requestToken({
          method: "GET",
          url: "/customer/account",
          params: { customerId: res.data.data.id },
        }).then((res: any) => {
          if (res.data.data.content.length > 0) {
            setListAccount(res.data.data.content);
          }
        });
      })
      .catch((err: any) => {
        console.log("err: ", err);
      });
  }, [setCustomer]);

  const onChange = (value: any) => {
    setCurrentAccount(value)
    requestToken({
      method: "GET",
      url: "/transaction/account",
      params: { accountId: value },
    })
      .then((res: any) => {
        setListTransaction(res.data.data.content);
        
      })
      .catch((err: any) => {
        console.log("err: ", err);
      });
  };

  return (
    <STransactionHistory>
      <div className="top">
        <h3
          className="header"
          onClick={() => toggleSidebar && toggleSidebar(false)}
        >
          <FaChevronLeft color={theme.text.main} size={16} />
          Lịch sử giao dịch
        </h3>
      </div>

        <div className="table-container">
          <div style={{ marginBottom: "30px" }}>
            <span style={{ paddingRight: "15px" }}> Chọn 1 tài khoản:</span>
            <Select
              placeholder="Select an account"
              optionFilterProp="children"
              onChange={onChange}
            >
              {listAccount.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.code}
                  </Option>
                );
              })}
            </Select>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </div>
    </STransactionHistory>
  );
}
