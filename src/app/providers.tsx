"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";
import { IconContext } from "react-icons";

const Providers: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="cupcake">
      <IconContext.Provider value={{ className: "h-5 w-5" }}>
        {children}
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export { Providers };
