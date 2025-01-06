import React, { CSSProperties, useState } from "react";
import { Icons, Images } from "../../constants";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
}

const ProfileSearchBox: React.FC<{
  handleSubmit: (value: string) => void;
  isLoading: boolean;
}> = ({ handleSubmit, isLoading }) => {
  const [value, setValue] = useState("");

  const prepareSubmit = () => {
    const trimmedValue = value.trim()
    handleSubmit(trimmedValue)
  };

  return (
    <div className="flex flex-row flex-1 bg-card-light rounded-lg">
      <div className="flex justify-center items-center px-4 border-r-2">
        <img src={Images.beatleader} width={26} />
      </div>
      <input
        className={`flex flex-1 px-4 py-3 bg-card-light ${isLoading ? "text-tx-alt" : "text-tx-light"} font-geist font-medium text-cbody bg-transparent outline-none`}
        placeholder="BeatLeader Profile ID"
        onChange={(e) => setValue(e.target.value)}
        onSubmit={prepareSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim() !== "") {
            prepareSubmit()
          }
        }}
        disabled={isLoading}
      />
      <button
        className="w-[58px] h-[50px] flex justify-center items-center bg-blue-light dark:bg-blue-dark px-4 py-3 hover:bg-blue-400 dark:hover:bg-sky-600 rounded-l-none rounded-r-lg outline-none focus:outline-none"
        onClick={prepareSubmit}
        disabled={isLoading || value.trim() !== ""}
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
  );
};

export default ProfileSearchBox;
