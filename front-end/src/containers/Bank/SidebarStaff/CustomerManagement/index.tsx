import { Avatar, Button, Col, Divider, Drawer, Form, Input, List, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { requestToken } from "src/api/axios";
import WrapContent from "src/common/components/WrapContent";
import { NavigatorContext, ProfileContext } from "src/common/context/NavigatorContext";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import { SInnerSidebar } from "./styles";

export default function CustomerManagement() {
  const { theme } = useContext(ThemeContext);
  const { data } = useContext(ProfileContext);

  const { toggleSidebar } = useContext(ToggleSidebarContext);
  const [state, setstate] = useState<any>();


  const [reload, setReload] = useState(false);

  const mustReload = () => {
    setReload(!reload);
  }

  useEffect(() => {
    if (data) {
      requestToken({
        method: "GET",
        url: "staff/customer",
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
    <WrapContent title="Quản lý khách hàng">
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
        {/* <div className="search">
          <h3>Tìm kiếm </h3>
          <FormLayoutDemo />
        </div>
        <Divider /> */}

        <div className="handle" style={{ marginBottom: "20px" }}>
          <p>Thêm mới khách hàng</p>
          <CreateCustomer callback={() => { mustReload() }} />
        </div>

        <div className="body">
          <h3>Danh sách khách hàng</h3>
          {/* <Table columns={columns} dataSource={state?.data ?? []} /> */}
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

  const [customer, setCustomer] = useState<any>();

  const showDrawer = (id: any) => {
    requestToken({ method: "GET", url: `/customer?id=${id}` }).then((res: any) => {
      setState({
        visible: true,
      });
      setCustomer(res.data.data);
    })
  };

  return (
    <>
      <List
        dataSource={data.map((i: any) => ({ name: i.name, id: i.id, address: i.address }))}
        bordered
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              <div className="handle-button" style={{ display: "flex", alignItems: "center" }}>
                <div className="edit" style={{ marginRight: "5px" }}>
                  <EditCustomer item={item} callback={() => { mustReload() }} />
                </div>

                <Button onClick={() => showDrawer(item.id)} key={`a-${item.id}`}>
                  Xem chi tiết
                </Button>
              </div>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a>{item.name}</a>}
              description={item.address}
            />
          </List.Item>
        )}
      />

      {customer && <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={state.visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          Thông tin khách hàng
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Mã khách hàng" content={customer?.id} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="CMT/CCCD" content={customer?.card_id} />
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>
            <DescriptionItem title="Họ và Tên" content={customer?.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Tên tài khoản" content={customer?.user.username} />
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col span={12}>
            <DescriptionItem title="Địa chỉ" content={customer?.address} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Ngày sinh" content={customer?.birthday} />
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