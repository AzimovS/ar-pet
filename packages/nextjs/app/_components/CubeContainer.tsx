"use client";

import Cube from "./Cube";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";

const CubeContainer = () => {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <Cube />
        </XR>
      </Canvas>
    </>
  );
};

export default CubeContainer;
