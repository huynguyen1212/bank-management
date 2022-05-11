import { createContext, ReactNode, useState } from "react";

interface ISidebarAdminContext {
  indexAdmin: number;
  setIndexAdmin: any;
}

export const SidebarAdminContext = createContext<ISidebarAdminContext>(
  {} as ISidebarAdminContext
);

const SidebarAdminProvider = ({ children }: { children: ReactNode }) => {
  const [indexAdmin, setIndexAdmin] = useState(0);

  return (
    <SidebarAdminContext.Provider value={{ indexAdmin, setIndexAdmin }}>
      {children}
    </SidebarAdminContext.Provider>
  );
};

export default SidebarAdminProvider;
