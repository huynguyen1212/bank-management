import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
} from 'antd';
import { request, requestToken } from 'src/api/axios';
import moment from 'moment';
import { Alert } from 'src/common/components/Alert';

export default function EditCustomer({ item, callback }: any) {
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

  const [customer, setCustomer] = useState<any>();
  // console.log("customer: ", customer);

  useEffect(() => {
    requestToken({ method: "GET", url: `/customer?id=${item?.id}` }).then((res: any) => {
      setCustomer(res.data.data);
    })
  }, [item])


  const onFinish = (values: any) => {
    const birthday = values.birthday.format("yyyy-MM-DD")
    requestToken({
      method: "PUT",
      url: "customer",
      data: {
        ...values,
        birthday: birthday,
        id: customer?.id,
      },
    }).then((res) => {
      setState({ visible: false });
      if (res.data.status === "OK") {
        Alert({ name: res.data.message, icon: "success" })
      } else {
        Alert({ name: res.data.message, icon: "info" })
      }
      callback()
    }).catch((err) => {
    })
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Sửa thông tin
      </Button>

      <Modal
        visible={visible}
        title="Sửa thông tin khách hàng"
        width={700}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{
            "name": customer?.name,
            "birthday": moment(customer?.birthday),
            "card_id": customer?.card_id,
            "address": customer?.address,
            "status": customer?.status
          }}
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

          <Form.Item
            label="Trạng thái"
            valuePropName="checked"
            style={{ marginBottom: "15px" }}
            name="status"
            rules={[{ required: true, message: "Please input your status!" }]}
          >
            <Switch />
          </Form.Item>

          <Form.Item label="">
            <Button htmlType="submit">Sửa</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

