import React, { useState } from 'react'
import { Modal } from 'antd';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { requestToken } from 'src/api/axios';
import { Alert } from 'src/common/components/Alert';

export default function Recharge({ account, callback }: any) {
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
    requestToken({
      method: "POST",
      url: "account/recharge",
      data: {
        account: {
          id: account?.id
        },
        ...values,
      },
    }).then((res) => {
      console.log("res: ", res);
      setState({ visible: false });
      if (res.data.status === "OK") {
        Alert({ name: res.data.message, icon: "success" })
      } else {
        Alert({ name: res.data.message, icon: "info" })
      }
      callback()
    }).catch((err) => {
      console.log("err: ", err);
    })
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Nạp tiền
      </Button>

      <Modal
        visible={visible}
        title="Nạp tiền"
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
            label="Số tiền"
            style={{ marginBottom: "15px" }}
            name="amount"
            rules={[{ required: true, message: "Please input your amount!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="">
            <Button htmlType="submit">Nạp</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

