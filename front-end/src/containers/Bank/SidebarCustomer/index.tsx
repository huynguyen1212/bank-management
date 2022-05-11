import React, { useContext, useEffect } from "react";
import Overlay from "src/common/components/Overlay";
import { NavigatorContext } from "src/common/context/NavigatorContext";
import { SidebarCustomerContext } from "src/common/context/SidebarCustomerContext";
import { ToggleSidebarContext } from "src/common/context/ToggleSidebarContext";
import Accountmanagement from "./Accountmanagement";
import Payment from "./Payment";
import Recharge from "./Recharge";
import { SSidebar } from "./styles";
import TransactionHistory from "./TransactionHistory";
import UpdateProfile from "./UpdateProfile";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";

export default function SidebarCustomer() {
  const { indexCustomer } = useContext(SidebarCustomerContext);
  const { open, toggleSidebar } = useContext(ToggleSidebarContext);
  const router = useRouteMatch();

  useEffect(() => {
    toggleSidebar && toggleSidebar(false);
  }, [router, toggleSidebar]);

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
          <Route path={`${router.path}/account`}>
            <Accountmanagement />
          </Route>
          <Route path={`${router.path}/pay`}>
            <Payment />
          </Route>
          <Route path={`${router.path}/history`}>
            <TransactionHistory />
          </Route>
          <Route path={`${router.path}/update`}>
            <UpdateProfile />
          </Route>
        </Switch>
        {indexCustomer === 0 && <Accountmanagement />}
        {indexCustomer === 1 && <Payment />}
        {indexCustomer === 2 && <TransactionHistory />}
        {indexCustomer === 3 && <UpdateProfile />}
      </SSidebar>
    </>
  );
}
