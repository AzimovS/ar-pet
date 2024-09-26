"use client";

import dynamic from "next/dynamic";
import type { NextPage } from "next";

const DynamicXrHitModelContainer = dynamic(() => import("../_components/XrHitModelContainer"), {
  ssr: false,
});

const Pet: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 h-96 ">
        <DynamicXrHitModelContainer />
      </div>
    </>
  );
};

export default Pet;
