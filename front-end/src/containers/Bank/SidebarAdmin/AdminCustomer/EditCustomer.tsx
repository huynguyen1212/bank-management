import { useState, useEffect } from 'react'
import { Divider, Modal, Switch } from 'antd';
import {
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
} from 'antd';
import { requestToken } from 'src/api/axios';
import { Alert } from 'src/common/components/Alert';
import moment from 'moment';

export default function EditCustomer({ open, setOpen }: any) {

    const handleCancel = () => {
        setOpen(0)
    };

    // console.log("open", open);

    const [staff, setStaff] = useState<any>();

    useEffect(() => {
        if (open) {
            requestToken({ method: "GET", url: `/customer?id=${open}` }).then(res => {
                setStaff(res.data.data);
                //console.log("res", res.data);
            }).catch(err => { })
        }
    }, [open])

    return (
        <div>

            <Modal
                onCancel={handleCancel}
                visible={open ? true : false}
                title="Chỉnh sửa Khách hàng"
                width={700}
                footer={null}
            >
                {staff && <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    size={"middle"}
                    onFinish={(data: any) => {
                        //console.log("data", data);
                        requestToken({
                            method: "PUT", url: `/customer?id=${staff.id}`, data: {
                                ...data,
                                birthday: data.birthday.format("DD/MM/YYYY"),
                                id: staff.id
                            }
                        }).then((res) => {
                            if (res.data.status === "CREATED") {
                                Alert({ name: res?.data?.message??"", icon: "success" })
                            } else {
                                Alert({ name: res?.data?.message??"", icon: "info" })
                            }
                        }).catch((err) => {
                            Alert({ name: err?.data?.message??"Có lỗi xảy ra.", icon: "error" })
                        })
                    }}
                    initialValues={{
                        "address": staff?.address ?? "",
                        "birthday": moment(staff?.birthday),
                        "card_id": staff?.card_id ?? "",
                        "name": staff?.name ?? "",
                        "username": staff?.user?.username ?? "",
                        "status": staff?.status
                    }}
                >

                    <Form.Item label="Tài khoản" name="username">
                        <Input disabled value={staff.username} />
                    </Form.Item>

                    <Form.Item label="Họ và tên" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="CMT" name="card_id">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ngày sinh" name="birthday">
                        <DatePicker />
                    </Form.Item>

                    <Form.Item label="Địa chỉ" name="address">
                        <Input />
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Trạng thái" valuePropName="status" name="status">
                        <Switch defaultChecked={staff.status} />
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

