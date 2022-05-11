import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { SInnerSidebar } from "./styles";
import { Table, Tag, Space, Form, Input, Button, Radio } from 'antd';
import { requestToken } from "src/api/axios";
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import CreateStaff from "./CreateStaff";
import EditStaff from "./EditStaff";
import { clearParams } from "src/common/helper";

export default function AdminStaff() {
  const { theme } = useContext(ThemeContext);

  const { toggleSidebar } = useContext(ToggleSidebarContext);

  // data 
  const [state, setstate] = useState<any>();
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState<any>({});

  const mustReload = () => {
    setReload(!reload);
  }

  useEffect(() => {
    requestToken({ method: "GET", url: `/staff/list?${new URLSearchParams(clearParams(search)).toString()}` }).then((res) => {
      //console.log(res.data.data);
      let resData = res.data.data;
      setstate({ data: resData.content })
    }).catch()
  }, [reload, search])

  // tao nhan vien 
  const [modal, setModal] = useState(false)
  return (
    <SInnerSidebar>
      <div className="top">
        <h3
          className="header"
          onClick={() => toggleSidebar && toggleSidebar(false)}
        >
          <FaChevronLeft color={theme.text.main} size={16} />
          Quản lý tài khoản Staff
        </h3>
      </div>
      <Divider />

      <div className="search">
        <h3>Tìm kiếm </h3>
        <FormSearch onSearch={setSearch} />
      </div>
      <Divider />

      <div className="handle">
        <Button type="primary" onClick={() => setModal(!modal)} >Thêm mới</Button>
        <CreateStaff open={modal} setOpen={setModal} callback={() => { mustReload() }} />
      </div>
      <Divider />

      <div className="body">
        <h3>Bảng danh sách Nhân viên</h3>
        <ListData data={state?.data ?? []} />
      </div>
    </SInnerSidebar>
  );
}

const FormSearch = ({ onSearch }: any) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout={"inline"}
      form={form}
      onFinish={(data) => {
        console.log("data", data);
        onSearch(data);
      }}
    >
      <Form.Item label="Tên nhân viên" name="name">
        <Input placeholder="Nhập..." />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">Tìm kiếm</Button>
      </Form.Item>
    </Form>
  );
};


const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const ListData = ({ data }: any) => {
  const [state, setState] = useState({ visible: false })
  const [staff, setStaff] = useState<any>();

  const showDrawer = (id: any) => {
    requestToken({ method: "GET", url: `/staff?id=${id}` }).then((res: any) => {
      setState({
        visible: true,
      });
      //console.log(res.data.data);
      setStaff(res.data.data);
    })
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };
  // update stafff 
  const [update, setUpdate] = useState(0);

  return (
    <>
      <List
        dataSource={data.map((i: any) => ({ name: i.name, id: i.id, address: i.address }))}
        bordered
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a onClick={() => showDrawer(item.id)} key={`a-${item.id}`}>
                Xem chi tiết
              </a>,
              <a onClick={() => setUpdate(item.id)} key={`a-${item.id}`}>
                Chỉnh sửa
              </a>,

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
      {staff && <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={state.visible}
      >
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          Thông tin nhân viên
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Mã nhân viên" content={staff.id} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="CMT" content={staff.card_id} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Họ và Tên" content={staff.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Tên tài khoản" content={staff.user.username} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Địa chỉ" content={staff.address} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Ngày sinh" content={staff.birthday} />
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={12}>
            <DescriptionItem title="Bậc nghề" content={staff.rate} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Thâm niên" content={staff.expYear} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Vị trí công việc" content={staff.position} />
          </Col>
          {/* <Col span={12}>
            <DescriptionItem title="Thâm niên" content={staff.birthday} />
          </Col> */}
        </Row>
        <Divider />

      </Drawer>}

      {update ? <EditStaff open={update} setOpen={setUpdate} /> : ""}

    </>
  );
}
