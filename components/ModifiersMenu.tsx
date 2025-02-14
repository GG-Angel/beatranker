import { useContext, useEffect, useRef, useState } from "react";
import { useOnClickOutside, renderCommas } from "../utils/utils";
import { Modifier } from "../api/types";
import { Icons } from "../constants";
import { updateMods } from "../api/beatranker";
import { isAxiosError } from "axios";
import GlobalContext from "../context/GlobalContext";

type InfoDict = {
  [key in Modifier]: {
    name: string;
    desc: string;
    change: number;
  };
};

const info: InfoDict = {
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
  const {
    data,
    setData,
    originalRecs,
    modifiers,
    setModifiers,
    isUpdating,
    setIsUpdating,
    addLog,
    updateLog,
  } = useContext(GlobalContext);

  const [localModifiers, setLocalModifiers] = useState<Modifier[]>([]);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [appliedMods, setAppliedMods] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(menuRef, () => setIsOpened(false));

  useEffect(() => {
    setLocalModifiers(modifiers); // reset on close
  }, [isOpened]);

  useEffect(() => {
    function wereChangesMade(): boolean {
      if (modifiers.length !== localModifiers.length) return true;
      for (let i = 0; i < modifiers.length; i++) {
        if (modifiers[i] !== localModifiers[i]) return true;
      }
      return false;
    }
    setChangesMade(wereChangesMade());
  }, [modifiers, localModifiers]);

  useEffect(() => {
    if (isUpdating) {
      setIsOpened(false);
    }
  }, [isOpened, isUpdating]);

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
      const logId = addLog("information", "Recalculating modifiers...", true);
      try {
        const { plot, recs } = await updateMods(
          localModifiers,
          data.recs,
          data.ml.model
        );
        setData({ ...data, recs: recs, ml: { ...data.ml, plot: plot } });
        setModifiers(localModifiers);
        setAppliedMods(true);
        updateLog(
          logId,
          "success",
          "Successfully applied modifiers! :D",
          false
        );
      } catch (error) {
        let message = `Failed to refresh scores${
          isAxiosError(error) ? `: ${error.message}` : ". :("
        }`;
        updateLog(logId, "error", message, false);
        console.error(error)
      }
      setIsUpdating(false);
    }
  };

  const handleResetMods = async () => {
    if (!data || !originalRecs) return;
    setIsOpened(false);
    setIsUpdating(true);
    const logId = addLog("information", "Reverting modifier changes...", true);
    try {
      setData({ ...data, recs: originalRecs });
      setModifiers([]);
      setLocalModifiers([]);
      setAppliedMods(false);
      updateLog(
        logId,
        "success",
        "Reverted to original recommendations! :D",
        false
      );
    } catch (error) {
      updateLog(logId, "error", "Failed to revert modifier changes. :(", false);
      console.error(error)
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
    setIsUpdating(false);
  };

  return (
    <div
      ref={menuRef}
      className="flex flex-col items-center font-geist font-medium text-cbody"
    >
      <button
        className={`transition ${
          isUpdating
            ? "text-tx-alt"
            : isOpened
            ? "text-indigo-500 dark:text-indigo-300"
            : `text-tx-light dark:text-tx-dark hover:text-indigo-500 hover:dark:text-indigo-300`
        }`}
        onClick={() => setIsOpened(!isOpened)}
        disabled={isUpdating}
      >
        Modifiers
        {modifiers.length > 0 && (
          <span className="text-tx-alt ml-2">({renderCommas(modifiers)})</span>
        )}
      </button>
      {isOpened && (
        <div className="absolute top-[72px] w-[256px] flex flex-col items-center z-20 rounded-lg shadow-xl bg-card-light dark:bg-card-dark shadow-black/5">
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
                className={`w-full flex flex-col px-4 py-2 text-left transition
                ${
                  disabled
                    ? "opacity-40 grayscale"
                    : localModifiers.includes(mod)
                    ? "bg-indigo-100 dark:bg-indigo-400/30"
                    : "hover:bg-card-alt-light dark:hover:bg-card-alt-dark"
                }
                ${index == 0 && "rounded-t-lg"}
                `}
                onClick={() => toggleModifier(mod)}
                disabled={disabled}
                key={index}
              >
                <div className="w-full flex flex-row justify-between">
                  <p>{modInfo.name}</p>
                  <p
                    className={`${
                      modInfo.change >= 0
                        ? "text-green-light dark:text-green-dark"
                        : "text-red-light dark:text-red-dark"
                    }`}
                  >
                    {modInfo.change >= 0 && "+"}
                    {modInfo.change}%
                  </p>
                </div>
                <p className="text-ctri text-tx-alt">{modInfo.desc}</p>
              </button>
            );
          })}
          <button
            className={`flex flex-row w-full gap-x-2 items-center justify-between px-4 py-2 transition text-tx-dark ${
              appliedMods
                ? "bg-red-light dark:bg-red-dark hover:bg-opacity-90 active:bg-opacity-80"
                : "bg-tx-alt opacity-40"
            }`}
            disabled={!appliedMods}
            onClick={handleResetMods}
          >
            Revert Changes
            <Icons.undo fill="white" />
          </button>
          <button
            className={`flex flex-row w-full gap-x-2 items-center justify-between px-4 py-2 rounded-b-lg transition text-tx-dark ${
              changesMade
                ? "bg-green-dark dark:bg-green-light hover:bg-opacity-90 active:bg-opacity-80"
                : "bg-tx-alt opacity-40"
            }`}
            disabled={!changesMade}
            onClick={handleApplyMods}
          >
            Apply Mods
            <Icons.check fill="white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifiersMenu;
