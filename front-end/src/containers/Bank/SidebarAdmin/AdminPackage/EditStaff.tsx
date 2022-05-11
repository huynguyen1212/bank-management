import { useState, useEffect } from 'react'
import { Divider, Modal } from 'antd';
import {
    Form,
    Input,
    Button,
} from 'antd';
import { requestToken } from 'src/api/axios';
import { Alert } from 'src/common/components/Alert';

export default function EditPackage({ open, setOpen, callback }: any) {

    const handleCancel = () => {
        setOpen(0)
    };

    const [staff, setStaff] = useState<any>();

    useEffect(() => {
        if (open) {
            setStaff(open)
        }
    }, [open])
    //console.log("staff", staff);

    return (
        <div>

            <Modal
                onCancel={handleCancel}
                visible={open ? true : false}
                title="Chỉnh sửa Gói gửi tiền"
                width={700}
                footer={null}
            >
                {staff && <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    size={"middle"}
                    onFinish={(data: any) => {
                        console.log("data", data);
                        requestToken({
                            method: "PUT", url: "/package", data: {
                                ...data,
                                id: staff.id
                            }
                        }).then((res) => {
                            if (res.data.status === "CREATED") {
                                Alert({ name: res.data.message, icon: "success" })
                            } else {
                                Alert({ name: res.data.message, icon: "info" })
                            }
                            callback && callback();
                        }).catch((err) => {
                            Alert({ name: err.data.message, icon: "error" })
                        })
                    }}
                    initialValues={{
                        "name": staff?.name ?? "",
                        "apr": staff?.apr ?? "",
                        "minBalance": staff?.minBalance ?? "",
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
                   
                    <Divider />

                    <Button key="back" onClick={handleCancel}>
                        Huỷ
                    </Button>
                    <Button key="submit" type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </Form>}
            </Modal>
        </div>
    )
}

