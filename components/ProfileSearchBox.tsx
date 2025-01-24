import React, { useContext, useState } from "react";
import { Colors, Icons, Images } from "../constants";
import { PlayerData } from "../api/types";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import { getPlayer } from "../api/beatranker";
import GlobalContext from "../context/GlobalContext";

const ProfileSearchBox: React.FC<{
  updateData: (data: PlayerData) => void;
}> = ({ updateData }) => {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const [playerId, setPlayerId] = useState("");
  const [statusText, setStatusText] = useState("");

  const handleSubmitId = async () => {
    setIsLoading(true);
    setStatusText("Predicting scores...");
    try {
      const playerData = await getPlayer(playerId);
      updateData(playerData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.detail) {
        setStatusText(error.response.data.detail);
      } else {
        setStatusText("Unexpected error, please try again. :(");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row flex-1 bg-card-light rounded-lg">
        <div className="flex justify-center items-center px-4 border-r-2">
          <img src={Images.beatleader} width={26} />
        </div>
        <input
          className={`flex flex-1 px-4 py-3 bg-card-light  text-tx-light font-geist font-medium text-cbody bg-transparent outline-none`}
          placeholder="BeatLeader Profile ID"
          onChange={(e) => setPlayerId(e.target.value)}
          onSubmit={handleSubmitId}
          onKeyDown={(e) => {
            if (e.key === "Enter" && playerId.trim() !== "") {
              handleSubmitId();
            }
          }}
          disabled={isLoading}
        />
        <button
          className={`w-[58px] h-[50px] flex justify-center items-center ${
            isLoading || playerId.trim() === ""
              ? "bg-blue-300 dark:bg-blue-300"
              : "bg-blue-light dark:bg-blue-dark px-4 py-3 hover:bg-blue-400 dark:hover:bg-sky-600"
          } rounded-l-none rounded-r-lg outline-none focus:outline-none`}
          onClick={handleSubmitId}
          disabled={isLoading || playerId.trim().length === 0}
        >
          {isLoading ? <LoadingSpinner /> : <Icons.search fill="white" />}
        </button>
      </div>
      {statusText && (
        <p className={`${!isLoading && "text-red-light dark:text-red-dark"}`}>
          {statusText}
        </p>
      )}
    </div>
  );
};

export default ProfileSearchBox;
