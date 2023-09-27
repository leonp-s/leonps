"use client";

import Nature from "@/components/nature";
import Navbar from "@/components/navbar";
import { useTheme } from "next-themes";
import { Fragment } from "react";

const Home = () => {
  const { theme } = useTheme();

  return (
    <Fragment>
      <div style={{ height: "100dvh" }}>
        <Nature timeOfDay={theme == "light" ? 0 : 1} />
      </div>
      <div className="bg-gray-900" style={{ height: "400dvh" }} />
      <Navbar />
    </Fragment>
  );
};

export default Home;
