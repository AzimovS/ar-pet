import React, { forwardRef } from "react";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";

// Define the props type
interface InterfaceProps {
  // Add any props here, for now leaving it empty
  props?: any;
  ref?: any;
}

// Typing the forwardRef and props
const Interface = forwardRef<HTMLDivElement, InterfaceProps>((props, ref) => {
  console.log(props);

  // Properly typing the values retrieved from the context
  const { animations, animationIndex, setAnimationIndex }: any = useCharacterAnimations();

  return (
    <div className="absolute w-full h-full bottom-20 pointer-events-none" ref={ref}>
      <div className="absolute bottom-[8vh] w-full">
        <div className="flex justify-center items-center w-[90%] gap-4 mx-auto p-4 overflow-auto pointer-events-auto button-container">
          {animations.map((animation: string, index: number) => (
            <button
              key={`${animation}-${index}`}
              onClick={() => setAnimationIndex(index)}
              className={`px-4 py-2 rounded-sm border-none text-white cursor-pointer ${
                index === animationIndex ? "bg-[rgba(255,127,80,1)]" : "bg-[rgba(255,127,80,0.7)]"
              }`}
            >
              {animation}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

Interface.displayName = "Interface";

export default Interface;
