import { createContext, ReactNode, useState } from "react";

interface IGlobalLoading {
  isLoading: boolean;
  toggleLoading: any;
}

export const GlobalLoadingContext = createContext({isLoading: false} as IGlobalLoading);

const GLProvider = ({children} :  { children: ReactNode }) => {

  const [isLoading, toggleLoading] = useState(false);

  return (
    <GlobalLoadingContext.Provider value={{isLoading, toggleLoading}}>
      {children}
    </GlobalLoadingContext.Provider>
  )
}

export default GLProvider;