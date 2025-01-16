import React, { useState } from "react";
import { PlayerData } from "../api/types";
import { LoadingSpinner } from "./LoadingSpinner";
import { getPlayer } from "../api/fetch";
import { isAxiosError } from "axios";

export const RefreshButton: React.FC<{
  data: PlayerData;
  setData: (data: PlayerData) => void;
}> = ({ data, setData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshData = async () => {
    if (data) {
      setIsLoading(true);
      try {
        const playerData = await getPlayer(data.profile.id);
        setData(playerData);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(error.response);
        } else {
          console.error("Failed to refresh scores");
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center font-geist font-medium text-cbody text-tx-light dark:text-tx-dark">
      <button onClick={() => refreshData()} disabled={isLoading}>
        Refresh
      </button>
      {isLoading && <LoadingSpinner style="absolute top-16 z-10" />}
    </div>
  );
};
