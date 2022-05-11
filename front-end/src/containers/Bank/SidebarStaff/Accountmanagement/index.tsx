import { Avatar, Button, Col, Divider, Drawer, Form, Input, List, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { requestToken } from "src/api/axios";
import WrapContent from "src/common/components/WrapContent";
import { ProfileContext } from "src/common/context/NavigatorContext";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { SInnerSidebar } from "../Salary/styles";
import CreateAccount from "./CreateAccount";
import EditAccount from "./EditAccount";
import Recharge from "./Recharge";

export default function Accountmanagement() {
  const { toggleSidebar } = useContext(ToggleSidebarContext);
  const { theme } = useContext(ThemeContext);
  const { data } = useContext(ProfileContext);
  const [state, setstate] = useState<any>();

  const [reload, setReload] = useState(false);

  const mustReload = () => {
    setReload(!reload);
  }

  useEffect(() => {
    if (data) {
      requestToken({
        method: "GET",
        url: "account/list",
        params: {
          staffId: data?.id
        }
      }).then((res) => {
        // console.log(res.data.data);
        let resData = res.data.data;
        setstate({ data: resData.content })
      }).catch()
    }
  }, [reload, data])

  return (
    <WrapContent title="Quản lý tài khoản">
      <SInnerSidebar>
        <div className="top">
          <h3
            className="header"
            onClick={() => toggleSidebar && toggleSidebar(false)}
          >
            <FaChevronLeft color={theme.text.main} size={16} />
          </h3>
        </div>

        <Divider />
        {/* <Divider />
        <div className="search">
          <h3>Tìm kiếm </h3>
          <FormLayoutDemo />
        </div>
        <Divider /> */}

        <div className="handle" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <div className="handle_item create" style={{ marginRight: "20px" }}>
            <p>Thêm mới Tài khoản</p>
            <CreateAccount callback={() => { mustReload() }} />
          </div>
          <div className="handle_item edit">
            <p>Sửa Tài khoản</p>
            <EditAccount callback={() => { mustReload() }} />
          </div>
        </div>

        <div className="body">
          <h3>Danh sách tài khoản</h3>

          <ListData data={state?.data ?? []} mustReload={mustReload} />
        </div>
      </SInnerSidebar>
    </WrapContent>
  );
}


const FormLayoutDemo = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('inline');

  return (
    <Form
      layout={"inline"}
      form={form}
      initialValues={{
        layout: formLayout,
      }}
    >
      <Form.Item label="Field A">
        <Input placeholder="Nhập..." />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="Nhập..." />
      </Form.Item>
      <Form.Item >
        <Button type="primary">Tìm kiếm</Button>
      </Form.Item>
    </Form>
  );
};

const ListData = ({ data, mustReload }: any) => {
  const [state, setState] = useState({ visible: false })
  const onClose = () => {
    setState({
      visible: false,
    });
  };

  const [account, setAccount] = useState<any>();

  // console.log("data: ", data);

  const showDrawer = (id: any) => {
    requestToken({ method: "GET", url: `/account?id=${id}` }).then((res: any) => {
      setState({
        visible: true,
      });
      // console.log(res.data.data);
      setAccount(res.data.data);
    })
  };

  return (
    <>
      <List
        dataSource={data}
        bordered
        renderItem={(item: any) => {
          // console.log("item: ", item);
          return (
            <List.Item
              key={item.id}
              actions={[
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="recharge" style={{ marginRight: "5px" }}>
                    <Recharge account={item} callback={() => { mustReload() }} />
                  </div>

                  <div className="detail">
                    <Button onClick={() => showDrawer(item.id)} key={`a-${item.id}`}>
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              ]}
            >
              <>
                {/* <List.Item.Meta
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  }
                  title={<a href="https://ant.design/index-cn">{ }</a>}
                  description={null}
                /> */}

                <DescriptionItem title="Mã tài khoản" content={item?.id} />

                <DescriptionItem title="Số tài khoản" content={item?.code} />

                <DescriptionItem title="Số dư" content={item?.balance} />

                <DescriptionItem title="Số dư tín dụng" content={item?.balance_interest} />

                <DescriptionItem title="Số dư tiết kiệm" content={item?.balance_saving} />

              </>
            </List.Item>
          )
        }}
      />

      {account && <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={state.visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          Thông tin tài khoản
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Mã tài khoản" content={account?.id} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Số tài khoản" content={account?.code} />
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>
            <DescriptionItem title="Số dư" content={account?.balance} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Loại tài khoản" content={account?.apackage?.type === "saving" ? "Tiết kiệm" : "Tín dụng"} />
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>
            <DescriptionItem title="Tên người dùng" content={account?.customer?.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Mã người dùng" content={account?.customer?.id} />
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>
            <DescriptionItem title="Trạng thái" content={account?.status === true ? "Hoạt động" : "Khóa"} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Nhân viên quản lý" content={account?.staff?.name} />
          </Col>
        </Row>
      </Drawer>}
    </>
  );
}

const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);