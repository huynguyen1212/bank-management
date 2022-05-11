import { createContext, ReactNode, useState } from "react";

interface IAuthContext {
  info: any;
  setInfo: any;
}

export const AuthContext = createContext({ info: null } as IAuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [info, setInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ info, setInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
