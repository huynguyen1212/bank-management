import { createContext, ReactNode, useState } from "react";

interface ICustomerContext {
  customer: any;
  setCustomer: any;
}

export const CustomerContext = createContext({ customer: null } as ICustomerContext);

export default function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState(null);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}
