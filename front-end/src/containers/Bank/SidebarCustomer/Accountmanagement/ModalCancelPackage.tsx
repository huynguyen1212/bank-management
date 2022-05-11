import { Button, Modal, Form } from "antd";
import React, { useContext } from "react";
import { requestToken } from "src/api/axios";
import { Alert } from "src/common/components/Alert";
import { CustomerContext } from "src/common/context/CustomerContext";
import styled from "styled-components";

export default function ModalCancelPackage({
  currentAccount,
  open,
  setOpen,
  callback,
}: any) {
  const { customer } = useContext(CustomerContext);
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      onCancel={handleCancel}
      visible={open}
      title="Xác nhận hủy gói tiết kiệm"
      width={700}
      footer={null}
    >
      <SStyle>
        <div className="info">
          <div className="title">Thông tin tài khoản tiết kiệm</div>
          <div className="content">
            <div className="item">
              Loại gói: {currentAccount?.apackage?.name}
            </div>
            <div className="item">
              Ngày tạo:{" "}
              {new Date(currentAccount?.apackage?.createdAt).toLocaleString()}
            </div>
            <div className="item">
              Tiền gửi: {currentAccount?.balance_saving}
            </div>
            <div className="item">
              Tiền lãi: {currentAccount?.balance_interest}
            </div>
          </div>
        </div>
        <div className="btn-container">
          <Button key="back" onClick={handleCancel}>
            Huỷ bỏ
          </Button>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={() => {
              requestToken({
                method: "POST",
                url: "/account/cancel-saving",
                data: { id: currentAccount?.id },
              })
                .then((res) => {
                  Alert({ name: "Hủy gói thành công!", icon: "success" });
                  setOpen(false);
                  callback && callback();
                })
                .catch((err) => {
                  Alert({
                    name:
                      err?.data?.message ?? "Có lỗi xảy ra, vui lòng thử lại",
                    icon: "error",
                  });
                });
            }}
          >
            Xác nhận
          </Button>
        </div>
      </SStyle>
    </Modal>
  );
}

const SStyle = styled.div`
  .info {
    .title {
      text-align: center;
      font-weight: 700;
      font-size: 17px;
    }
    .content {
      margin: 20px auto;
      text-align:center;
    }
  }
  .btn-container {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      margin: 0 20px;
    }
  }
`;
