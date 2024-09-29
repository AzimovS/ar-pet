import React, { useEffect, useRef } from "react";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";

export default function Model({ position, modelURI }: { position?: Vector3; modelURI: string }) {
  const group = useRef<Group>(null);
  const { nodes, animations } = useGLTF(modelURI);
  const { actions, names } = useAnimations(animations, group);
  console.log(nodes, console.log(nodes.wolf));
  const { setAnimations, animationIndex }: any = useCharacterAnimations();

  useEffect(() => {
    setAnimations(names);
  }, []);
  useGLTF.preload(modelURI);
  console.log(modelURI);
  useEffect(() => {
    if (actions && names && names[animationIndex]) {
      console.log(actions, names, animationIndex);
      actions[names[animationIndex]]?.reset().fadeIn(0.5).play();

      return () => {
        actions[names[animationIndex]]?.fadeOut(0.5);
      };
    }
  }, [actions, names, animationIndex]);

  return (
    <group ref={group} position={position} dispose={null}>
      <group scale={0.91}>
        <primitive object={nodes.Wolf} />
      </group>
    </group>
  );
}
