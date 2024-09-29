import React, { useEffect, useRef } from "react";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { FEEDING_PRICE } from "~~/utils/constants";

export default function Model({ position, modelURI }: { position?: Vector3; modelURI: string }) {
  const group = useRef<Group>(null);
  const { nodes, animations } = useGLTF(modelURI);
  const { actions, names } = useAnimations(animations, group);
  const { setAnimations, animationIndex }: any = useCharacterAnimations();

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("ARPet");

  const feedPet = async () => {
    await writeYourContractAsync({
      functionName: "feedPet",
      value: parseEther(FEEDING_PRICE),
    });
    return true;
  };

  useEffect(() => {
    setAnimations(names);
  }, []);
  useGLTF.preload(modelURI);
  useEffect(() => {
    const feed = async () => {
      try {
        const response = await feedPet();
        return response; // If feedPet is successful, return true
      } catch (error) {
        console.error("Error feeding pet:", error);
        return false; // If there's an error, return false
      }
    };

    const handleAction = async () => {
      if (actions && names && names[animationIndex]) {
        // Check if the current animation is "Take"
        if (names[animationIndex] === "Take") {
          actions[names[0]]?.reset().fadeIn(0.5).play();
          const isFeeded = await feed(); // Await the feed function
          actions[names[0]]?.fadeOut(0.5);
          actions[names[animationIndex]]?.reset().fadeIn(0.5).play();
          if (!isFeeded) return; // Exit if feeding was unsuccessful
        }

        // If successful or not "Take", play the animation
        actions[names[animationIndex]]?.reset().fadeIn(0.5).play();
      }
    };

    // Call the async handler function
    handleAction();

    // Return cleanup function
    return () => {
      actions[names[animationIndex]]?.fadeOut(0.5);
    };
  }, [actions, names, animationIndex]);

  return (
    <group ref={group} position={position} dispose={null}>
      <group scale={0.91}>
        <primitive object={nodes.Wolf} />
      </group>
    </group>
  );
}
