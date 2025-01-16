import React, { useState } from "react";
import { PlayerData } from "../api/types";
import { LoadingSpinner } from "./LoadingSpinner";
import { getPlayer } from "../api/fetch";

export const RefreshButton: React.FC<{
  data: PlayerData;
  setData: (data: PlayerData) => void;
}> = ({ data, setData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const refreshData = async () => {
    if (data) {
      setIsLoading(true);
      try {
        const playerData = await getPlayer(data.profile.id);
        setData(playerData);
        setStatus("☑️");
      } catch (error) {
        setStatus("✖️");
      }
      setIsLoading(false);
      setTimeout(() => {
        setStatus("");
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col items-center font-geist font-medium text-cbody text-tx-light dark:text-tx-dark">
      <button onClick={() => refreshData()} disabled={isLoading}>
        Refresh
      </button>
      <div className="fixed top-16 z-10">
        {isLoading && <LoadingSpinner />}
        {status}
      </div>
    </div>
  );
};
