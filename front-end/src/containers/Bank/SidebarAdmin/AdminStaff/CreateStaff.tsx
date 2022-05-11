import { Modal } from 'antd';
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

export default function CreateStaff({ open, setOpen, callback }: any) {

    const handleCancel = () => {
        setOpen(false)
    };

    return (
        <div>
            <Modal
                onCancel={handleCancel}
                visible={open}
                title="Thêm mới nhân viên"
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
                            method: "POST", url: "/staff", data: {
                                ...data,
                                birthday: data.birthday.format("DD/MM/YYYY")
                            }
                        }).then((res) => {
                            if (res.data.status === "CREATED") {
                                Alert({ name: res.data.message, icon: "success" })
                            } else {
                                Alert({ name: res.data.message, icon: "info" })
                            }
                            callback();
                        }).catch((err) => {
                            Alert({ name: err?.data?.message??"Có lỗi xảy ra.", icon: "error" })
                        })
                    }}
                >

                    <Form.Item label="Tài khoản" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mật khẩu" name="password">
                        <Input />
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

                    <Form.Item label="Số năm kinh nghiệm" name="exp_year">
                        <InputNumber />
                    </Form.Item>

                    <Form.Item label="Bậc nghề" name="rate">
                        <Select>
                            <Select.Option value="low">Thấp</Select.Option>
                            <Select.Option value="mid">Trung bình</Select.Option>
                            <Select.Option value="high">Cao</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Vị trí công việc" name="position">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
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

