import React, { useState } from "react";
import { APIResponse } from "../api/types";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";

export const RefreshButton: React.FC<{
  data: APIResponse;
  setData: (data: APIResponse) => void;
}> = ({ data, setData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const refreshData = async () => {
    if (data) {
      setIsLoading(true);
      try {
        const resp = await axios.get(
          `http://127.0.0.1:8000/recommendations/${data?.profile.id}`
        );
        const player_data = resp.data;
        setData(player_data);
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
      <div className="fixed top-14 z-10">
        {isLoading && <LoadingSpinner />}
        {status}
      </div>      
    </div>
  );
};
