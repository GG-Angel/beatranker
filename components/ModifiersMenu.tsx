import React, { useContext, useEffect, useState } from "react";
import { renderCommas } from "../api/utils";
import { Modifier, PlayerData } from "../api/types";
import { Icons } from "../constants";
import { updateMods } from "../api/fetch";
import { isAxiosError } from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import GlobalContext from "../context/GlobalContext";

type ModInfoDict = {
  [key in Modifier]: {
    name: string;
    desc: string;
    change: number;
  };
};

const info: ModInfoDict = {
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
const allMods = Object.keys(info) as Modifier[];

const ModifiersMenu = () => {
  const { data, setData, modifiers, setModifiers, isUpdating, setIsUpdating } = useContext(GlobalContext);
  
  const [localModifiers, setLocalModifiers] = useState<Modifier[]>([]);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // useEffect(() => {
  //   setLocalModifiers(modifiers); // reset on close
  // }, [isOpened]);

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

  useEffect(() => {
    if (isUpdating) {
      setIsOpened(false);
    }
  }, [isUpdating])

  const toggleModifier = (mod: Modifier) => {
    setLocalModifiers(
      localModifiers.includes(mod)
        ? localModifiers.filter((m) => m !== mod)
        : [...localModifiers, mod]
    );
  };

  const handleApplyMods = async () => {
    if (data) {
      setIsUpdating(true);
      try {
        console.log(localModifiers);
        const updatedRecs = await updateMods(
          localModifiers,
          data.recs,
          data.ml.model
        );
        setData({ ...data, recs: updatedRecs });
        setModifiers(localModifiers);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(error.response);
        } else {
          console.error("Failed to refresh mods");
        }
      }
      setIsUpdating(false);
    }
  };

  return (
    <div className={`flex flex-col items-center font-geist font-medium text-cbody ${isUpdating ? "text-tx-alt" : "text-tx-light dark:text-tx-dark"}`}>
      <button onClick={() => setIsOpened(!isOpened)} disabled={isUpdating}>
        Modifiers
        {modifiers.length > 0 && (
          <span className="text-tx-alt ml-2">({renderCommas(modifiers)})</span>
        )}
      </button>
      {isOpened && (
        <div className="absolute top-[72px] w-[256px] flex flex-col items-center z-20 rounded-lg shadow-xl bg-card-light dark:bg-card-dark shadow-bg-light dark:shadow-bg-dark">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-solid border-b-card-light dark:border-b-card-dark border-l-transparent border-r-transparent absolute top-[-12px]"></div> 
          {allMods.map((mod, index) => {
            const disabled =
              conflictingMods.includes(mod) &&
              localModifiers.some(
                (m) => conflictingMods.includes(m) && m !== mod
              );
            const modInfo = info[mod];
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
            className={`flex flex-row w-full gap-x-2 items-center justify-center px-4 py-2 rounded-b-lg text-tx-dark bg-green-dark dark:bg-green-light ${
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
      {isUpdating && <LoadingSpinner style="absolute top-16 z-10" />}
    </div>
  );
};

export default ModifiersMenu;
