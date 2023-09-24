"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

const Providers: FC<{ children?: ReactNode }> = ({ children }) => {
  return <ThemeProvider defaultTheme="cupcake">{children}</ThemeProvider>;
};

export { Providers };
