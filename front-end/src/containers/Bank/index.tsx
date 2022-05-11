import React, { useContext, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import { requestToken } from 'src/api/axios'
import API_URL from 'src/api/url'
import { ProfileContext } from 'src/common/context/NavigatorContext'
import { RoleContext } from 'src/common/context/RoleContext'
import Navigator from './Navigator'
import SidebarAdmin from './SidebarAdmin'
import SidebarCustomer from './SidebarCustomer'
import SidebarStaff from './SidebarStaff'
import { SBank } from './styles'

export default function Bank() {
  let match = useRouteMatch();
  const { setData } = useContext(ProfileContext)
  const { setRole } = useContext(RoleContext);

  useEffect(() => {
    requestToken({
      method: "GET",
      url: API_URL.AUTH.PROFILE
    }).then((res) => {
      setData(res?.data?.data);
      setRole((res.data.data.user.role as string).toLocaleLowerCase())
    })
  }, [])

  return (
    <SBank>
      <Navigator />

      <Switch>
        <Route path={`${match.path}/admin`} >
          <SidebarAdmin />
        </Route>
        <Route path={`${match.path}/staff`} >
          <SidebarStaff />
        </Route>
        <Route path={`${match.path}/customer`} >
          <SidebarCustomer />
        </Route>
      </Switch>
    </SBank>
  )
}
