import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { roleStaff } from "src/containers/Bank/Navigator/store/data";

interface ISidebarStaffContext {
  indexStaff: number;
  setIndexStaff: any;
}

export const SidebarStaffContext = createContext<ISidebarStaffContext>(
  {} as ISidebarStaffContext
);

const SidebarStaffProvider = ({ children }: { children: ReactNode }) => {
  const [indexStaff, setIndexStaff] = useState(0);

  // let location = useLocation();

  // useEffect(() => {

  //   roleStaff.map((st, i) => {
  //     if (st.route === location.pathname) {
  //       setIndexStaff(i)
  //     }
  //   })
  // }, [location])


  return (
    <SidebarStaffContext.Provider value={{ indexStaff, setIndexStaff }}>
      {children}
    </SidebarStaffContext.Provider>
  );
};

export default SidebarStaffProvider;
