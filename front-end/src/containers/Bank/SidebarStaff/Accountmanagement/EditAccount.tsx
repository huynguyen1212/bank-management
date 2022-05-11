import React, { useState } from 'react'
import { Modal, Switch } from 'antd';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { requestToken } from 'src/api/axios';
import { Alert } from 'src/common/components/Alert';

export default function EditAccount({ callback }: any) {
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
      method: "PUT",
      url: "account",
      data: {
        ...values,
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
        Sửa tài khoản
      </Button>

      <Modal
        visible={visible}
        title="Sửa tài khoản"
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
            label="Trạng thái"
            valuePropName="checked"
            style={{ marginBottom: "15px" }}
            name="status"
            rules={[{ required: true, message: "Please input your status!" }]}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Mã tài khoản"
            style={{ marginBottom: "15px" }}
            name="id"
            rules={[{ required: true, message: "Please input your id!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="">
            <Button htmlType="submit">Sửa</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

