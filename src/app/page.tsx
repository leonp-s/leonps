"use client";

import Nature from "@/components/nature";
import Navbar from "@/components/navbar";

const Home = () => {
  return (
    <main>
      <Nature />
      <Navbar />
      <div className="bg-gray-900" style={{ height: "400vh" }} />
    </main>
  );
};

export default Home;
