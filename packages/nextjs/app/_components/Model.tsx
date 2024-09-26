import React, { useEffect, useRef } from "react";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";

export default function Model({ position }: { position?: Vector3 }) {
  const group = useRef<Group>(null);
  const { nodes, animations } = useGLTF("/models/wolf.gltf");
  const { actions, names } = useAnimations(animations, group);
  console.log(nodes, console.log(nodes.wolf));
  const { setAnimations, animationIndex }: any = useCharacterAnimations();

  useEffect(() => {
    setAnimations(names);
  }, []);

  useEffect(() => {
    if (actions && names && names[animationIndex]) {
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

useGLTF.preload("/models/wolf.gltf");
