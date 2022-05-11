import { createContext, ReactNode, useState } from "react";

interface INavigatorContenxt {
  index: number;
  setIndex: any;
}

export const NavigatorContext = createContext<INavigatorContenxt>(
  {} as INavigatorContenxt
);

const NavigatorProvider = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState(0);

  return (
    <NavigatorContext.Provider value={{ index, setIndex }}>
      {children}
    </NavigatorContext.Provider>
  );
};

export default NavigatorProvider;

interface IProfileContenxt {
  data: any;
  setData: any;
}

export const ProfileContext = createContext<IProfileContenxt>(
  {} as IProfileContenxt
);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>();

  return (
    <ProfileContext.Provider value={{ data, setData }}>
      {children}
    </ProfileContext.Provider>
  );
};