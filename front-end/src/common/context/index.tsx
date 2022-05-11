import { ReactNode } from "react";
import AuthProvider from "./AuthContext";
import GLProvider from "./GlobalLoadingContext";
import NavigatorProvider, { ProfileProvider } from "./NavigatorContext";
import CustomThemeProvider from "./ThemeContext";
import ToggleSidebarProvider from "./ToggleSidebarContext";
import ReactsProvider from "./ReactContext";
import SidebarStaffProvider from "./Staff/SidebarStaffContext";
import SidebarCustomerProvider from "./SidebarCustomerContext";
import SidebarAdminProvider from "./SidebarAdminContext";
import RoleProvider from "./RoleContext";
import CustomerProvider from "./CustomerContext";

export default function MyProvider({ children }: { children: ReactNode }) {
  return (
    <CustomThemeProvider>
      <GLProvider>
        <AuthProvider>
          <RoleProvider>
            <NavigatorProvider>
              <ProfileProvider>
                <CustomerProvider>
                  <SidebarAdminProvider>
                    <SidebarStaffProvider>
                      <SidebarCustomerProvider>
                        <ToggleSidebarProvider>
                          <ReactsProvider>{children}</ReactsProvider>
                        </ToggleSidebarProvider>
                      </SidebarCustomerProvider>
                    </SidebarStaffProvider>
                  </SidebarAdminProvider>
                </CustomerProvider>
              </ProfileProvider>
            </NavigatorProvider>
          </RoleProvider>
        </AuthProvider>
      </GLProvider>
    </CustomThemeProvider>
  );
}
