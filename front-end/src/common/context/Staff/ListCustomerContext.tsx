import { createContext, ReactNode, useState } from "react";

interface ISidebarStaffContext {
  listCustomer: any;
  setListCustomer: any;
}

export const SidebarStaffContext = createContext<ISidebarStaffContext>(
  {} as ISidebarStaffContext
);

const SidebarStaffProvider = ({ children }: { children: ReactNode }) => {
  const [listCustomer, setListCustomer] = useState(0);

  return (
    <SidebarStaffContext.Provider value={{ listCustomer, setListCustomer }}>
      {children}
    </SidebarStaffContext.Provider>
  );
};

export default SidebarStaffProvider;
