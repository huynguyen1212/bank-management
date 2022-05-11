import { createContext, ReactNode, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface IToggleSidebarContenxt {
  open: boolean;
  toggleSidebar: any;
}

export const ToggleSidebarContext = createContext<IToggleSidebarContenxt>(
  {} as IToggleSidebarContenxt
);

const ToggleSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, toggleSidebar] = useState(false);

  const canToggle = useMediaQuery({ maxWidth: 991 });

  return (
    <ToggleSidebarContext.Provider
      value={{ open, toggleSidebar: canToggle ? toggleSidebar : null }}
    >
      {children}
    </ToggleSidebarContext.Provider>
  );
};

export default ToggleSidebarProvider;
