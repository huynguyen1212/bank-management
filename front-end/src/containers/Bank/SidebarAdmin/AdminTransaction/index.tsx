import { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { SInnerSidebar } from "./styles";
import { Form, Input, Button , Select, Table} from 'antd';
import { requestToken } from "src/api/axios";
import { Drawer, List, Avatar, Divider, Col, Row } from 'antd';
import CreateStaff from "./CreateStaff";
import EditStaff from "./EditStaff";
import { clearParams } from "src/common/helper";

export default function AdminTransaction() {
  const { theme } = useContext(ThemeContext);

  // data
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [listTransaction, setListTransaction] = useState<any[]>([]);
  const [listAccount, setListAccount] = useState<any[]>([]);

  useEffect(() => {
    //console.log(listTransaction)
    const tempList: any[] = [];
    listTransaction.map((item: any, index: any) => {
      tempList.push({
        ...item,
        time: (new Date(item.createdAt)).toLocaleString(),
        type:
          item.type === "IN"
            ? "Nạp tiền"
            : item.type === "OUT"
            ? "Rút tiền"
            : "Chuyển khoản",
        amount: item?.amount,
        content: item?.note,
      });
    });
    setDataSource(tempList);
  }, [listTransaction]);

  useEffect(() => {
    requestToken({
      method: "GET",
      url: "/account/list",
      params: {
        unpaged: true
      }
    })
      .then((res: any) => {
        setListAccount(res.data.data.content);
      })
      .catch((err: any) => {
        console.log("err: ", err);
      });
  }, [])

  const onChange = (value: any) => {
    requestToken({
      method: "GET",
      url: "/transaction/account",
      params: { accountId: value },
    })
      .then((res: any) => {
        setListTransaction(res.data.data.content);
      })
      .catch((err: any) => {
        console.log("err: ", err);
      });
  };

  const columns = [
    {
      title: "Tài khoản nhận",
      dataIndex: "account_in",
      key: "account_in.code",
      render: (text: string, record: any) => {
        return <a>{record?.account_in?.code??""}</a>
      },
    },
    {
      title: "Tài khoản gửi",
      dataIndex: "account_out",
      key: "account_out.code",
      render: (text: string, record: any) => {
        return <a>{record?.account_out?.code??""}</a>
      },
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Loại giao dịch", //Nạp - gửi - nhận - rút
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
  ];
  const { Option } = Select;

  const { toggleSidebar } = useContext(ToggleSidebarContext);

  // data 
  const [reload, setReload] = useState(false);

  const mustReload = () => {
    setReload(!reload);
  }


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
          Quản lý Giao dịch
        </h3>
      </div>
      <Divider />

      {/* <div className="search">
        <h3>Tìm kiếm </h3>
         <FormSearch onSearch={setSearch} /> 
      </div>
      <Divider /> */}

      {/* <div className="handle">
        <Button type="primary" onClick={() => setModal(!modal)} >Thêm mới</Button>
        <CreateStaff open={modal} setOpen={setModal} callback={() => { mustReload() }} />
      </div> */}
      <Divider />

      <div className="body">
        <h3>Bảng danh sách Giao dịch</h3>
        {/* <ListData data={state?.data ?? []} /> */}
        <div className="table-container">
          <div style={{ marginBottom: "30px" }}>
            <span style={{ paddingRight: "15px" }}> Chọn 1 tài khoản:</span>
            <Select
              placeholder="Select an account"
              optionFilterProp="children"
              onChange={onChange}
            >
              {listAccount.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.code}
                  </Option>
                );
              })}
            </Select>
          </div>
          <Table dataSource={dataSource} columns={columns} />
        </div>
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
      <Form.Item label="Tên Giao dịch" name="name">
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
          Thông tin Giao dịch
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Mã Giao dịch" content={staff.id} />
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
