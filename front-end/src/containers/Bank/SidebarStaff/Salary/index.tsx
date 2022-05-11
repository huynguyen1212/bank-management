import { Avatar, Button, Col, DatePicker, Divider, Drawer, Form, Input, List, Row } from "antd";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { requestToken } from "src/api/axios";
import WrapContent from "src/common/components/WrapContent";
import { ProfileContext } from "src/common/context/NavigatorContext";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { SInnerSidebar } from "./styles";

export default function Salary() {
  const { toggleSidebar } = useContext(ToggleSidebarContext);
  const { theme } = useContext(ThemeContext);
  const { data } = useContext(ProfileContext);
  const [state, setstate] = useState<any>();
  const [totalSalary, settotalSalary] = useState<any>();
  console.log("totalSalary ", totalSalary);

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const [search, setSearch] = useState<any>({});

  useEffect(() => {
    if (data) {
      if (Object.keys(search).length > 0) {
        requestToken({
          method: "GET",
          url: "staff/salary",
          params: {
            start: search?.start?.format("yyyy-MM-DD"),
            staffId: data?.id,
            end: search?.end?.format("yyyy-MM-DD"),
          }
        }).then((res) => {
          setstate(res?.data?.data?.list)
          settotalSalary(res?.data?.data?.salary)
        }).catch()
      } else {
        requestToken({
          method: "GET",
          url: "staff/salary",
          params: {
            start: firstDay,
            staffId: data?.id,
            end: lastDay,
          }
        }).then((res) => {
          setstate(res?.data?.data?.list)
          settotalSalary(res?.data?.data?.salary)
        }).catch()
      }
    }
  }, [data, search])

  return (
    <WrapContent title="Bảng lương">
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
        <div className="search">
          <h3>Xem lương từ ngày - đến ngày</h3>
          <FormLayoutDemo setSearch={setSearch} />
        </div>
        <Divider />

        <h3>Tổng lương của nhân viên: {totalSalary}</h3>

        <Divider />

        <div className="body">
          <h3>Danh sách</h3>

          <ListData data={state ?? []} />
        </div>
      </SInnerSidebar>
    </WrapContent>
  );
}

const FormLayoutDemo = ({ setSearch }: { setSearch: any }) => {
  const [form] = Form.useForm();

  return (
    <Form
      layout={"inline"}
      form={form}
      onFinish={(data) => {
        // console.log("data", data);
        setSearch(data);
      }}
    >
      <Form.Item
        label="Từ ngày"
        style={{ marginBottom: "15px" }}
        name="start"
        rules={[{ required: true, message: "Please input your start!" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Đến ngày"
        style={{ marginBottom: "15px" }}
        name="end"
        rules={[{ required: true, message: "Please input your end!" }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">Tìm kiếm</Button>
      </Form.Item>
    </Form>
  );
};

const ListData = ({ data }: any) => {
  const [state, setState] = useState({ visible: false })
  const onClose = () => {
    setState({
      visible: false,
    });
  };

  return (
    <List
      dataSource={data}
      bordered
      renderItem={(item: any) => (
        <List.Item
          key={item.id}
        // actions={}
        >
          <>
            {/* <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a href="https://ant.design/index-cn">{ }</a>}
              description={null}
            /> */}


            <DescriptionItem title="Mã" content={item?.id} />

            <DescriptionItem title="Số tiền" content={item?.amount} />

            <DescriptionItem title="Ngày" content={new Date(item?.updatedAt)?.toLocaleString()} />

            <DescriptionItem title="Ghi chú" content={item?.note} />

          </>
        </List.Item>
      )}
    />
  );
}

const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label"></p>
    {title}: {` `}
    {content}
  </div>
);
