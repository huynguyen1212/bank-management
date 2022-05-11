import { Modal } from 'antd';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { useEffect, useState } from 'react';
import { requestToken } from 'src/api/axios';
import { Alert } from 'src/common/components/Alert';

export default function AddPackage({ data, open, setOpen, callback }: any) {

    const handleCancel = () => {
        setOpen(false)
    };

    const [packeage, setPackage] = useState([]);
    const [packeageCurent, setPackageCurent] = useState<any>();

    useEffect(() => {
        if (open) {
            requestToken({ method: "GET", url: `/package` }).then(res => {
                setPackage(res.data.data);
            }).catch(err => { })
        }
        //console.log("currentAccount", data);
    }, [open, data])

    return (
        <div>
            <Modal
                onCancel={handleCancel}
                visible={open}
                title="Đăng ký gói gửi tiền tiết kiệm"
                width={700}
                footer={null}
            >
                {data && <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    size={"middle"}
                    initialValues={{
                        code: data?.code
                    }}
                    onFinish={(dataForm: any) => {
                        //console.log("data", data);
                        requestToken({
                            method: "POST", url: "/account/register-package", data: {
                                "amount": dataForm.amount,
                                "id_account": data.id,
                                "id_package": packeageCurent.id
                              }
                        }).then((res) => {
                            if (res.data.status === "CREATED") {
                                Alert({ name: res.data.message, icon: "success" })
                            } else {
                                Alert({ name: res.data.message, icon: "info" })
                            }
                            setOpen(false);
                            callback && callback();
                        }).catch((err) => {
                            Alert({ name: err?.data?.message ?? "Có lỗi xảy ra.", icon: "error" })
                        })
                    }}
                >
                    <Form.Item label="Mã Tài khoản" name="code">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Gói tài khoản" name="rate">
                        <Select onChange={(val: number) => {
                            //console.log(val);
                            setPackageCurent(packeage[val])
                        }} >
                            {packeage.map((item: any, index: any) => <Select.Option key={index} value={index}>{item.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    {
                        packeageCurent && <>
                            <Form.Item label="Lãi suất">
                                <Input disabled value={packeageCurent?.apr} />
                            </Form.Item>
                            <Form.Item label="Số dư tối thiểu" >
                                <Input disabled value={packeageCurent?.minBalance} />
                            </Form.Item>
                        </>
                    }
                    <Form.Item label="Số tiền muốn nạp" name="amount">
                        <Input />
                    </Form.Item>

                    <Button key="back" onClick={handleCancel}>
                        Huỷ đăng ký
                    </Button>
                    <Button key="submit" type="primary" htmlType="submit">
                        Đăng ký gói
                    </Button>
                </Form>}
            </Modal>
        </div>
    )
}

