"use client";

import Nature from "@/components/nature";
import Navbar from "@/components/navbar";

const Home = () => {
  return (
    <main>
      <Nature />
      <div className="bg-gray-900" style={{ height: "400vh" }} />
      <Navbar />
    </main>
  );
};

export default Home;
