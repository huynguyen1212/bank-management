import { Modal } from 'antd';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { requestToken } from 'src/api/axios';
import { Alert } from 'src/common/components/Alert';

export default function CreatePackage({ open, setOpen, callback }: any) {

    const handleCancel = () => {
        setOpen(false)
    };

    return (
        <div>
            <Modal
                onCancel={handleCancel}
                visible={open}
                title="Thêm mới Gói tài khoản"
                width={700}
                footer={null}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    size={"middle"}
                    onFinish={(data: any) => {
                        //console.log("data", data);
                        requestToken({
                            method: "POST", url: "/package", data: {
                                ...data,
                                type: "saving"
                            }
                        }).then((res) => {
                            if (res.data.status === "CREATED") {
                                Alert({ name: res.data.message, icon: "success" })
                            } else {
                                Alert({ name: res.data.message, icon: "info" })
                            }
                            callback();
                        }).catch((err) => {
                            Alert({ name: err?.data?.message ?? "Có lỗi xảy ra.", icon: "error" })
                        })
                    }}
                >

                    <Form.Item label="Tên gói" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Lãi suất" name="apr">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số dư tối thiểu" name="minBalance">
                        <Input />
                    </Form.Item>
                    <Button key="back" onClick={handleCancel}>
                        Huỷ
                    </Button>
                    <Button key="submit" type="primary" htmlType="submit">
                        Tạo
                    </Button>
                </Form>
            </Modal>
        </div>
    )
}

