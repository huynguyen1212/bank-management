import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

export enum ETheme {
  LIGHT = "light",
  DARK = "dark",
}

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeType, setThemeType] = useState<ETheme | null>(null);

  const setTheme = () => {
    const nextTheme = themeType === ETheme["LIGHT"] ? ETheme["DARK"] : ETheme["LIGHT"]
    setThemeType(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ETheme;
    if(Object.values(ETheme).includes(storedTheme)) {
      setThemeType(storedTheme);
    }
    else {
      setThemeType(ETheme["LIGHT"]);
      localStorage.setItem('theme', ETheme["LIGHT"]);
    }
  }, [])

  if(!themeType) return <></>

  return (
    <ThemeProvider theme={{ theme: theme[themeType], setTheme, themeType }}>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
