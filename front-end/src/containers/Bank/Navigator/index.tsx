import { Dropdown, Menu, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import { ThemeContext } from "styled-components";
import { menu, roleAdmin, roleCustomer, roleStaff } from "./store/data";
import { SNavigator, SHandleButton } from "./styles";
import { AiTwotoneBank } from "react-icons/ai";
import { SidebarStaffContext } from "src/common/context/Staff/SidebarStaffContext";
import { SidebarCustomerContext } from "src/common/context/SidebarCustomerContext";
import { SidebarAdminContext } from "src/common/context/SidebarAdminContext";
import { RoleContext } from "src/common/context/RoleContext";

export default function Navigator() {
  const { theme } = useContext(ThemeContext);
  const { role } = useContext(RoleContext);
  const { indexStaff, setIndexStaff } = useContext(SidebarStaffContext);
  const { indexCustomer, setIndexCustomer } = useContext(SidebarCustomerContext);
  const { indexAdmin, setIndexAdmin } = useContext(SidebarAdminContext);
  const { toggleSidebar } = useContext(ToggleSidebarContext);
  console.log("role", role);

  return (
    <SNavigator>
      <div className="logo">
        <AiTwotoneBank size={30} color={theme.logo} />
      </div>

      <div className="list">
        {
          role === "staff" ? (
            roleStaff.map((st, i) => {
              return (
                <Link to={`${st.route}`}>
                  <Tooltip placement="right" title="">
                    <SHandleButton
                      active={indexStaff === i}
                      onClick={() => {
                        setIndexStaff(i);
                        toggleSidebar && toggleSidebar(true);
                      }}
                    >
                      <div className="img">
                        {
                          st.icon
                        }
                      </div>
                      <span>{st.name}</span>
                    </SHandleButton>
                  </Tooltip>
                </Link>
              )
            })
          ) : role === "customer" ? (
            roleCustomer.map((st, i) => {
              return (
                <Tooltip placement="right" title="">
                  <SHandleButton
                    active={indexCustomer === i}
                    onClick={() => {
                      setIndexCustomer(i);
                      toggleSidebar && toggleSidebar(true);
                    }}
                  >
                    <div className="img">
                      {
                        st.icon
                      }
                    </div>
                    <span>{st.name}</span>
                  </SHandleButton>
                </Tooltip>
              )
            })
          ) : (
            roleAdmin.map((st, i) => {
              return (
                <Link to={`${st.route}`}>
                  <Tooltip placement="right" title="">
                    <SHandleButton
                      active={indexAdmin === i}
                      onClick={() => {
                        setIndexAdmin(i);
                        toggleSidebar && toggleSidebar(true);
                      }}
                    >
                      <div className="img">
                        {
                          st.icon
                        }
                      </div>
                      <span>{st.name}</span>
                    </SHandleButton>
                  </Tooltip>
                </Link>
              )
            })
          )
        }
      </div>


      <Dropdown
        placement="topRight"
        overlay={overlay(theme)}
        trigger={["click"]}
      >
        <Avatar
          style={{ cursor: "pointer", marginTop: "15px" }}
          size={40}
          src="/images/avt-placeholder.png"
        />
      </Dropdown>
    </SNavigator>
  );
}

const overlay = (theme: any) => {

  return (
    <Menu>
      {menu.map((m: any, i: number) => (
        <Menu.Item className="dropdown_item" key={i} onClick={m?.callback}>
          {m?.href ? <Link to={m.href}>{m.title}</Link> : m?.title}
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item
        style={{ color: theme.badge }}
        className="dropdown_item logout"
        key={menu.length}
      >
        <Link to="/">Log out</Link>
      </Menu.Item>
    </Menu>
  );
};
