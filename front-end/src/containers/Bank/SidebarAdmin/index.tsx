import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import Overlay from "src/common/components/Overlay";
import { NavigatorContext } from "src/common/context/NavigatorContext";
import { SidebarAdminContext } from "src/common/context/SidebarAdminContext";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import AdminCustomer from "./AdminCustomer";
import AdminPackage from "./AdminPackage";
import AdminStaff from "./AdminStaff";
import AdminTransaction from "./AdminTransaction";
import { SSidebar } from "./styles";

export default function SidebarAdmin() {
  const { indexAdmin } = useContext(SidebarAdminContext);
  const { open, toggleSidebar } = useContext(ToggleSidebarContext);
  const router = useRouteMatch();

  useEffect(() => {
    toggleSidebar && toggleSidebar(false);
  }, [router, toggleSidebar])

  return (
    <>
      {open && (
        <Overlay
          onClick={() => {
            toggleSidebar && toggleSidebar(false);
          }}
        />
      )}
      <SSidebar open={open}>
        <Switch>
        <Route path={`${router.path}`} exact >
          <AdminStaff />
        </Route>
        <Route path={`${router.path}/customer`} >
          <AdminCustomer />
        </Route>
        <Route path={`${router.path}/package`} >
          <AdminPackage />
        </Route>
        <Route path={`${router.path}/transaction`} >
          <AdminTransaction />
        </Route>
      </Switch>
      </SSidebar>
    </>
  );
}
