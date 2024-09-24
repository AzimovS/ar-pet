"use client";

import dynamic from "next/dynamic";
import type { NextPage } from "next";

const DynamicCubeContainer = dynamic(() => import("./_components/CubeContainer"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 h-96 ">
        <DynamicCubeContainer />
      </div>
    </>
  );
};

export default Home;
