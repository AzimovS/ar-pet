import { useState } from "react";
import { CharacterAnimationsProvider } from "../contexts/CharacterAnimations";
import Interface from "./Interface";
import XrHitModel from "./XrHitModel";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";

const XrHitModelContainer = () => {
  const [overlayContent, setOverlayContent] = useState<HTMLElement | null>(null);

  // Typing the ref function to accept an HTML element
  const interfaceRef = (node: HTMLElement | null) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  };

  return (
    <>
      <CharacterAnimationsProvider>
        <ARButton
          sessionInit={{
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
            domOverlay: { root: overlayContent as Element },
          }}
        />
        <Canvas>
          <XR>
            <XrHitModel />
          </XR>
        </Canvas>
        <Interface ref={interfaceRef} /> {/* Ref properly passed */}
      </CharacterAnimationsProvider>
    </>
  );
};

export default XrHitModelContainer;
