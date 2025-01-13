import React, { useState } from "react";
import { renderCommas } from "../api/utils";

const conversion = {
  SF: "Super Fast Song",
  FS: "Faster Song",
  GN: "Ghost Notes",
  SS: "Slower Song",
  NB: "No Bombs",
  NO: "No Obstacles",
  NA: "No Arrows",
};

const conflictingMods = ["SF", "FS", "SS"];

const ModifiersMenu: React.FC<{
  modifiers: string[];
  updateModifier: (mod: string) => void;
}> = ({ modifiers, updateModifier }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="font-geist font-medium text-cbody text-tx-light dark:text-tx-dark">
      <button onClick={() => setIsOpened(!isOpened)}>
        Modifiers
        {modifiers.length > 0 && (
          <span className="text-tx-alt ml-2">({renderCommas(modifiers)})</span>
        )}
      </button>
      {isOpened && (
        <div className="absolute w-[180px] flex flex-col z-10 mt-2 rounded-lg shadow-xl shadow-bg-light dark:shadow-bg-dark">
          {Object.keys(conversion).map((mod, index) => {
            const disabled =
              conflictingMods.includes(mod) &&
              modifiers.some((m) => conflictingMods.includes(m) && m !== mod);
            return (
              <button
                className={`w-full px-4 py-1 bg-transparent text-left ${
                  modifiers.includes(mod)
                    ? "bg-active-light dark:bg-active-dark"
                    : `bg-card-light dark:bg-card-dark ${
                        disabled
                          ? "text-tx-alt"
                          : "hover:bg-card-alt-light dark:hover:bg-card-alt-dark"
                      }`
                } 
                ${index == 0 && "rounded-t-lg"} ${
                  index == Object.keys(conversion).length - 1 && "rounded-b-lg"
                }`}
                onClick={() => updateModifier(mod)}
                disabled={disabled}
                key={index}
              >
                {conversion[mod as keyof typeof conversion]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ModifiersMenu;
