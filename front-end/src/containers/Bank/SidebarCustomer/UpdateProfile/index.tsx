import React, { useContext, useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { SUpdateProfile } from "./styles";
import { Form, Input, Button, DatePicker } from "antd";
import { requestToken } from "src/api/axios";
import { CustomerContext } from "src/common/context/CustomerContext";
import moment from "moment";
import "moment/locale/zh-cn";
import { Alert } from 'src/common/components/Alert';
export default function UpdateProfile() {
  const { theme } = useContext(ThemeContext);
  const { toggleSidebar } = useContext(ToggleSidebarContext);
  const { customer, setCustomer } = useContext(CustomerContext);
  const onFinish = (values: any) => {
    console.log(new Date('string'));
    const birthday = values.birthday.format("yyyy-MM-DD"); 
    console.log("birthday: ", birthday);

    requestToken({
      method: "PUT",
      url: "customer",
      data:{
        ...values,
          birthday: birthday,
          id: customer.id,
      },
      params: {
        id: customer.id,
      },
    })
      .then((res) => {
        Alert({ name: res.data.message, icon: "success" })
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  useEffect(() => {
    requestToken({
      method: "GET",
      url: "/auth/profile",
      // data: values,
    })
      .then((res: any) => {
        setCustomer(res.data.data);
        
      })
      .catch((err: any) => {
        console.log("err: ", err);
      });
  }, []);
  const tailLayout = {
    wrapperCol: { offset: 6, span: 14 },
  };
  return (
    <SUpdateProfile>
      <div className="top">
        <h3
          className="header"
          onClick={() => toggleSidebar && toggleSidebar(false)}
        >
          <FaChevronLeft color={theme.text.main} size={16} />
          Cập nhật thông tin
        </h3>
      </div>
      <div className="form-container">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size={"middle"}
          onFinish={onFinish}
          initialValues ={{
            name: customer?.name,
            birthday: moment(customer?.birthday)||null,
            card_id: customer?.card_id,
            address: customer?.address,
          }}
        >
          <Form.Item
            label="Tên"
            style={{ marginBottom: "15px" }}
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            style={{ marginBottom: "15px" }}
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday!" }]}
          >
            <DatePicker/>
          </Form.Item>

          <Form.Item
            label="Số CMT/CCCD"
            style={{ marginBottom: "15px" }}
            name="card_id"
            rules={[{ required: true, message: "Please input your card_id!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            style={{ marginBottom: "15px" }}
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </SUpdateProfile>
  );
}
