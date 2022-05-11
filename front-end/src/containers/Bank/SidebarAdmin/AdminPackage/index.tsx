import { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { SInnerSidebar } from "./styles";
import { Button } from 'antd';
import { requestToken } from "src/api/axios";
import { List, Avatar, Divider } from 'antd';
import CreateStaff from "./CreateStaff";
import EditStaff from "./EditStaff";

export default function AdminPackage() {
  const { theme } = useContext(ThemeContext);

  const { toggleSidebar } = useContext(ToggleSidebarContext);

  // data 
  const [state, setstate] = useState<any>();
  const[reload, setReload] = useState(false);
 // const [search, setSearch] = useState<any>({});

  const mustReload = () => {
    setReload(!reload);
  }
 
  useEffect(() => {
    requestToken({ method: "GET", url: `/package` }).then((res) => {
      //console.log(res.data.data);
      let resData = res.data.data;
      setstate({ data: resData })
    }).catch()
  }, [reload])

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
          Quản lý Gói gửi tiền
        </h3>
      </div>
      <Divider />


      <div className="handle">
        <Button type="primary" onClick={() => setModal(!modal)} >Thêm mới</Button>
        <CreateStaff open={modal} setOpen={setModal} callback = {() => {mustReload()}} />
      </div>
      <Divider />

      <div className="body">
        <h3>Bảng danh sách Gói gửi tiền</h3>
        <ListData data={state?.data ?? []} mustReload={() => mustReload()} />
      </div>
    </SInnerSidebar>
  );
}


const ListData = ({ data, mustReload }: any) => {
 
  // update stafff 
  const [update, setUpdate] = useState();

  return (
    <>
      <List
        dataSource={data}
        bordered
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              <a onClick={() => setUpdate(item)} key={`a-${item.id}`}>
                Chỉnh sửa
              </a>
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<a>{item.name}</a>}
              description={<>
              <p>Lãi xuất: {item.apr}%/năm </p>
              <p>Số dư tối thiểu: {item.minBalance} VNĐ </p>
              </>}
            />
          </List.Item>
        )}
      />
      {update ? <EditStaff open={update} setOpen={setUpdate} callback={() => {mustReload()}} /> : ""}
    </>
  );
}
