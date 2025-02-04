import { useContext } from "react";
import { getPlayer, updateMods } from "../api/beatranker";
import { isAxiosError } from "axios";
import GlobalContext from "../context/GlobalContext";

export const RefreshButton = () => {
  const {
    data,
    setData,
    modifiers,
    isUpdating,
    setIsUpdating,
    addLog,
    updateLog,
  } = useContext(GlobalContext);

  const refreshData = async () => {
    if (data) {
      setIsUpdating(true);
      const logId = addLog("information", "Refreshing scores...", true);
      try {
        const playerData = await getPlayer(data.profile.id, true);
        if (modifiers.length > 0) {
          const { plot, recs } = await updateMods(
            modifiers,
            playerData.recs,
            playerData.ml.model
          );
          setData({ ...data, recs: recs, ml: { ...data.ml, plot: plot } });
        } else {
          setData(playerData);
        }
        updateLog(logId, "success", "Successfully refreshed scores! :D", false);
      } catch (error) {
        let message = `Failed to refresh scores${
          isAxiosError(error) ? `: ${error.message}` : ". :("
        }`;
        updateLog(logId, "error", message, false);
      }
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center font-geist font-medium text-cbody transition ${
        isUpdating
          ? "text-tx-alt"
          : "text-tx-light dark:text-tx-dark hover:text-indigo-500 hover:dark:text-indigo-300"
      }`}
    >
      <button onClick={() => refreshData()} disabled={isUpdating}>
        Refresh
      </button>
    </div>
  );
};
