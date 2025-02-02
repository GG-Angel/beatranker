import { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { useOnClickOutside } from "../utils/utils";
import { PlayerData } from "../api/types";

export interface FilterState {
  gainsOnly: boolean;
  starRange: [number, number];
}

export const FiltersMenu = () => {
  const { data, setData, filters, setFilters, isUpdating } = useContext(GlobalContext);
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const menuRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(menuRef, () => setIsOpened(false));

  const updateStarRange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "min" | "max"
  ) => {
    const input = e.target.value;
    const [min, max] = filters.starRange;
    const value = /^\d+\.?\d*$/.test(input)
      ? Number(input)
      : field === "min"
      ? -Infinity
      : Infinity;
    if (field === "min" && value <= max) {
      setFilters((prev) => ({ ...prev, starRange: [value, max] }));
    }
    if (field === "max" && min <= value) {
      setFilters((prev) => ({ ...prev, starRange: [min, value] }));
    }
  };

  useEffect(() => {
    if (data) {
      const { gainsOnly, starRange } = filters
      const [min, max] = starRange
      const updatedRecs = data.recs.map((r) => ({
        ...r,
        isFiltered: (gainsOnly && r.weightedPPGain <= 0) || r.starsMod < min || r.starsMod > max
      }));
      setData((prev) => ({...prev, recs: updatedRecs} as PlayerData))
    }
  }, [data, filters])

  const isStarRangeEnabled =
    filters.starRange[0] > 0 || filters.starRange[1] < Infinity;

  return (
    <div
      ref={menuRef}
      className={`flex flex-col items-center font-geist font-medium text-cbody transition ${
        isUpdating ? "text-tx-alt" : "text-tx-light dark:text-tx-dark"
      }`}
    >
      <button onClick={() => setIsOpened(!isOpened)} disabled={isUpdating}>
        Filters
      </button>
      {isOpened && (
        <div className="absolute top-[72px] w-[256px] flex flex-col items-center z-20 rounded-lg shadow-xl bg-card-light dark:bg-card-dark shadow-black/5">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[12px] border-solid border-b-card-light dark:border-b-card-dark border-l-transparent border-r-transparent absolute top-[-12px]"></div>
          <button
            className={`w-full flex flex-col px-4 py-2 rounded-t-lg text-left transition ${
              filters.gainsOnly
                ? "bg-indigo-100 bg-indigo-400/30"
                : "hover:bg-card-alt-light dark:hover:bg-card-alt-dark"
            }`}
            onClick={() =>
              setFilters({ ...filters, gainsOnly: !filters.gainsOnly })
            }
          >
            <p>Chase Dem Gains 💪</p>
            <p className="text-ctri text-tx-alt">
              Only show maps you can gain PP from
            </p>
          </button>
          <div
            className={`w-full flex flex-col px-4 py-2 rounded-b-lg text-left transition ${
              isStarRangeEnabled && "bg-indigo-100 bg-indigo-400/30"
            }`}
          >
            <p>Reach for the Stars 💫</p>
            <p className="text-ctri text-tx-alt">
              Only show maps within this star range
            </p>
            <div className="flex flex-row gap-x-2 my-1">
              <input
                className={`w-full rounded-sm pl-2 outline-none transition bg-card-alt-light dark:bg-card-alt-dark`}
                value={filters.starRange[0]}
                onChange={(e) => updateStarRange(e, "min")}
                placeholder="min"
                type="number"
                min={0}
                max={Math.min(filters.starRange[1], 75)}
                step="any"
              />
              <input
                className="w-full rounded-sm pl-2 outline-none bg-card-alt-light dark:bg-card-alt-dark"
                value={filters.starRange[1]}
                onChange={(e) => updateStarRange(e, "max")}
                placeholder="max"
                type="number"
                min={Math.max(0, filters.starRange[0])}
                max={75}
                step="any"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
