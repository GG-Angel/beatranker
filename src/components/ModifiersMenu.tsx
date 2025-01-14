import React, { useEffect, useState } from "react";
import { renderCommas } from "../api/utils";
import { APIResponse } from "../api/types";
import { Icons } from "../../constants";

const info = {
  SF: {
    name: "Super Fast Song",
    desc: "Increases song speed by 50%",
    change: 72,
  },
  FS: {
    name: "Faster Song",
    desc: "Increases song speed by 20%",
    change: 40,
  },
  GN: {
    name: "Ghost Notes",
    desc: "Invisible notes with fading arrows",
    change: 8,
  },
  NB: {
    name: "No Bombs",
    desc: "Removes all bombs",
    change: -20,
  },
  NO: {
    name: "No Obstacles",
    desc: "Removes all walls",
    change: -20,
  },
  NA: {
    name: "No Arrows",
    desc: "Notes can be hit in any direction",
    change: -30,
  },
  SS: {
    name: "Slower Song",
    desc: "Decreases song speed by 15%",
    change: -30,
  },
};
const conflictingMods = ["SF", "FS", "SS"];
const allMods = Object.keys(info);

const ModifiersMenu: React.FC<{
  setData: (data: APIResponse) => void;
}> = ({ setData }) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [modifiers, setModifiers] = useState<string[]>([]);
  const [localModifiers, setLocalModifiers] = useState<string[]>([]);
  const [changesMade, setChangesMade] = useState<boolean>(false);

  useEffect(() => {
    setLocalModifiers(modifiers); // reset on close
  }, [isOpened]);

  useEffect(() => {
    function wereChangesMade(): boolean {
      if (modifiers.length !== localModifiers.length) return false;
      for (let i = 0; i < modifiers.length; i++) {
        if (modifiers[i] !== localModifiers[i]) return false;
      }
      return true;
    }
    setChangesMade(wereChangesMade());
  }, [modifiers, localModifiers]);

  const toggleModifier = (mod: string) => {
    setLocalModifiers(
      localModifiers.includes(mod)
        ? localModifiers.filter((m) => m !== mod)
        : [...localModifiers, mod]
    );
  };

  const handleApplyMods = () => {
    setIsOpened(false);
    setModifiers(localModifiers);
  };

  return (
    <div className="flex flex-col items-center font-geist font-medium text-cbody text-tx-light dark:text-tx-dark">
      <button onClick={() => setIsOpened(!isOpened)}>
        Modifiers
        {modifiers.length > 0 && (
          <span className="text-tx-alt ml-2">({renderCommas(modifiers)})</span>
        )}
      </button>
      {isOpened && (
        <div className="fixed top-16 w-[256px] flex flex-col z-10 rounded-lg shadow-xl bg-card-light dark:bg-card-dark shadow-bg-light dark:shadow-bg-dark">
          {allMods.map((mod, index) => {
            const disabled =
              conflictingMods.includes(mod) &&
              localModifiers.some(
                (m) => conflictingMods.includes(m) && m !== mod
              );
            const modInfo = info[mod as keyof typeof info];
            return (
              <button
                className={`w-full flex flex-col px-4 py-2 bg-transparent text-left 
                ${
                  disabled
                    ? "opacity-40 grayscale"
                    : localModifiers.includes(mod)
                    ? "bg-active-light dark:bg-active-dark"
                    : "hover:bg-card-alt-light dark:hover:bg-card-alt-dark"
                }
                ${index == 0 && "rounded-t-lg"}
                `}
                onClick={() => toggleModifier(mod)}
                disabled={disabled}
                key={index}
              >
                <p className="flex flex-row justify-between">
                  {modInfo.name}
                  <span
                    className={`${
                      modInfo.change >= 0
                        ? "text-green-light dark:text-green-dark"
                        : "text-red-light dark:text-red-dark"
                    }`}
                  >
                    {modInfo.change >= 0 && "+"}
                    {modInfo.change}%
                  </span>
                </p>
                <p className="text-ctri text-tx-alt">{modInfo.desc}</p>
              </button>
            );
          })}
          <button
            className={`flex flex-row gap-x-2 items-center justify-center px-4 py-2 rounded-b-lg text-tx-dark bg-green-dark dark:bg-green-light ${
              changesMade
                ? "grayscale opacity-40"
                : "hover:opacity-80 active:opacity-60"
            }`}
            disabled={changesMade}
            onClick={handleApplyMods}
          >
            Apply Mods
            <img src={Icons.check} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifiersMenu;
