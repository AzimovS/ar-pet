import React, { useEffect, useRef } from "react";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";

export default function Model({ position }: { position?: Vector3 }) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF("/models/druid.gltf");
  const { actions, names } = useAnimations(animations, group);

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
      <group scale={1.91}>
        <primitive object={nodes.root} />
        <skinnedMesh geometry={nodes.druid.geometry} material={materials.color_main} skeleton={nodes.druid.skeleton} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/druid.gltf");
