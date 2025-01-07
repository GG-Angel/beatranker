import React, { useState } from "react";
import { renderCommas } from "../api/utils";

const conversion = {
  "Super Fast Song": "SF",
  "Faster Song": "FS",
  "Ghost Notes": "GN",
  "Slower Song": "SS",
  "No Bombs": "NB",
  "No Obstacles": "NO",
  "No Arrows": "NA",
};

const ModifiersDropdown: React.FC<{ modifiers: string[], updateModifier: (mod: string) => void }> = ({
  modifiers,
  updateModifier
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="font-geist font-medium text-tx-light dark:text-tx-dark">
      <button onClick={() => setIsOpened(!isOpened)}>
        Modifiers
        <span className="text-tx-alt ml-2">({renderCommas(modifiers)})</span>
      </button>
      {isOpened && (
        <div className="absolute w-[180px] flex flex-col z-10 mt-2 rounded-lg shadow-xl shadow-bg-light dark:shadow-bg-dark">
          {Object.keys(conversion).map((mod, index) => (
            <button
              className={`w-full px-4 py-1 bg-transparent text-left ${
                modifiers.includes(conversion[mod as keyof typeof conversion])
                  ? "bg-active-light dark:bg-active-dark"
                  : "bg-card-light dark:bg-card-dark hover:bg-card-alt-light dark:hover:bg-card-alt-dark"
              } 
              ${index == 0 && "rounded-t-lg"} ${
                index == Object.keys(conversion).length - 1 && "rounded-b-lg"
              }`}
              onClick={() => updateModifier(mod)}
              key={index}
            >
              {mod}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModifiersDropdown;
