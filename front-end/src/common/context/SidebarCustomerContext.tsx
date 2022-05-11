import { createContext, ReactNode, useState } from "react";

interface ISidebarCustomerContext {
  indexCustomer: number;
  setIndexCustomer: any;
}

export const SidebarCustomerContext = createContext<ISidebarCustomerContext>(
  {} as ISidebarCustomerContext
);

const SidebarCustomerProvider = ({ children }: { children: ReactNode }) => {
  const [indexCustomer, setIndexCustomer] = useState(0);

  return (
    <SidebarCustomerContext.Provider value={{ indexCustomer, setIndexCustomer }}>
      {children}
    </SidebarCustomerContext.Provider>
  );
};

export default SidebarCustomerProvider;
