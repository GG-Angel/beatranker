import { useContext } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { getPlayer, updateMods } from "../api/fetch";
import { isAxiosError } from "axios";
import GlobalContext from "../context/GlobalContext";

export const RefreshButton = () => {
  const { data, setData, modifiers, isUpdating, setIsUpdating } =
    useContext(GlobalContext);

  const refreshData = async () => {
    if (data) {
      setIsUpdating(true);
      try {
        const playerData = await getPlayer(data.profile.id);
        if (modifiers.length > 0) {
          const moddedRecs = await updateMods(modifiers, playerData.recs, playerData.ml.model)
          setData({ ...playerData, recs: moddedRecs })
        } else {
          setData(playerData);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(error.response);
        } else {
          console.error("Failed to refresh scores");
        }
      }
      setIsUpdating(false);
    }
  };

  return (
    <div className={`flex flex-col items-center font-geist font-medium text-cbody ${isUpdating ? "text-tx-alt" : "text-tx-light dark:text-tx-dark"}`}>
      <button onClick={() => refreshData()} disabled={isUpdating}>
        Refresh
      </button>
      {isUpdating && <LoadingSpinner style="absolute top-16 z-10" />}
    </div>
  );
};
