import React, { CSSProperties, useState } from "react";
import { Icons, Images } from "../../constants";
import { ClipLoader } from "react-spinners";
import { APIResponse } from "../api/types";
import axios from "axios";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
}

const ProfileSearchBox: React.FC<{
  updateData: (data: APIResponse) => void
}> = ({ updateData }) => {
  const [playerId, setPlayerId] = useState("");
  const [statusText, setStatusText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitId = async () => {
    setIsLoading(true)
    setStatusText("Predicting scores...")
    try {
      const resp = await axios.get(`http://127.0.0.1:8000/recommendations/${playerId.trim()}`)
      const player_data = resp.data
      updateData(player_data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatusText(error.response?.data?.detail)
      } else {
        setStatusText("Unexpected error, please try again. :(")
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row flex-1 bg-card-light rounded-lg">
        <div className="flex justify-center items-center px-4 border-r-2">
          <img src={Images.beatleader} width={26} />
        </div>
        <input
          className={`flex flex-1 px-4 py-3 bg-card-light ${isLoading ? "text-tx-alt" : "text-tx-light"} font-geist font-medium text-cbody bg-transparent outline-none`}
          placeholder="BeatLeader Profile ID"
          onChange={(e) => setPlayerId(e.target.value)}
          onSubmit={handleSubmitId}
          onKeyDown={(e) => {
            if (e.key === "Enter" && playerId.trim() !== "") {
              handleSubmitId()
            }
          }}
          disabled={isLoading}
        />
        <button
          className={`w-[58px] h-[50px] flex justify-center items-center ${isLoading ? "bg-blue-300 dark:bg-blue-300" : "bg-blue-light dark:bg-blue-dark px-4 py-3 hover:bg-blue-400 dark:hover:bg-sky-600"} rounded-l-none rounded-r-lg outline-none focus:outline-none`}
          onClick={handleSubmitId}
          disabled={isLoading || playerId.trim() !== ""}
        >
          {isLoading ? (
            <ClipLoader 
              color="#FFFFFF"
              loading={isLoading}
              cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
            />
          ) : (
            <img src={Icons.search} />
          )}
        </button>
      </div>
      { statusText && (
        <p className={`${!isLoading && "text-red-400"}`}>
          {statusText}
        </p>
      )}
    </div>
  );
};

export default ProfileSearchBox;
