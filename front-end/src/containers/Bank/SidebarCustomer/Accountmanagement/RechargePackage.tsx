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

export default function RechargePackage({ data, open, setOpen, callback }: any) {

    const handleCancel = () => {
        setOpen(false)
    };

   // const [packeage, setPackage] = useState([]);
    const [packeageCurent, setPackageCurent] = useState<any>();

    useEffect(() => {
        if (open) {
            setPackageCurent(data.apackage)
        }
        //console.log("currentAccount", data);
    }, [open, data])

    return (
        <div>
            <Modal
                onCancel={handleCancel}
                visible={open}
                title="Nạp thêm tiền gửi tiết kiệm"
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
                            method: "POST", url: "/account/recharge-package", data: {
                                "amount": dataForm.amount,
                                "account":{
                                    "id": data.id
                                }
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
                    {
                        packeageCurent && <>
                            <Form.Item label="Tên gói">
                                <Input disabled value={packeageCurent?.name} />
                            </Form.Item>
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
                        Huỷ
                    </Button>
                    <Button key="submit" type="primary" htmlType="submit">
                        Nạp thêm tiền tiết kiệm
                    </Button>
                </Form>}
            </Modal>
        </div>
    )
}

