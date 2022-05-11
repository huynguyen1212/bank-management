import React, { useState } from 'react'
import { Modal } from 'antd';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
} from 'antd';
import { request, requestToken } from 'src/api/axios';
import { Alert } from 'src/common/components/Alert';

export default function CreateCustomer({ callback }: any) {
  const [state, setState] = useState<any>({
    loading: false,
    visible: false,
  })
  const { visible } = state;

  const handleOk = () => {
    setState({ loading: true });
    setTimeout(() => {
      setState({ loading: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const showModal = () => {
    setState({ ...state, visible: true });
  }

  const onFinish = (values: any) => {
    const birthday = values.birthday.format("DD/MM/YYYY")
    // console.log("birthday: ", birthday);

    requestToken({
      method: "POST",
      url: "customer",
      data: {
        ...values,
        birthday: birthday
      },
    }).then((res) => {
      // console.log("res: ", res);
      setState({ visible: false });
      if (res.data.status === "OK") {
        Alert({ name: res.data.message, icon: "success" })
      } else {
        Alert({ name: res.data.message, icon: "info" })
      }
      callback()
    }).catch((err) => {
      // console.log("err: ", err);
    })
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm khách hàng
      </Button>

      <Modal
        visible={visible}
        title="Thêm khách hàng"
        width={700}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ remember: true }}
          size={"middle"}
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên"
            style={{ marginBottom: "15px" }}
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            style={{ marginBottom: "15px" }}
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Tên tài khoản"
            style={{ marginBottom: "15px" }}
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "15px" }}
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
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

          {/* <Form.Item
            label="Trạng thái"
            valuePropName="checked"
            style={{ marginBottom: "15px" }}
            name="status"
            rules={[{ required: true, message: "Please input your status!" }]}
          >
            <Switch />
          </Form.Item> */}

          <Form.Item label="">
            <Button htmlType="submit">Tạo</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

