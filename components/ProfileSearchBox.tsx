import { useContext, useEffect, useState } from "react";
import { Icons, Images } from "../constants";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import { getPlayer, searchPlayers } from "../api/beatranker";
import GlobalContext from "../context/GlobalContext";
import { ProfileCompact } from "../api/types";

const ProfileSearchBox = () => {
  const { setData, setOriginalRecs, isLoading, setIsLoading } =
    useContext(GlobalContext);
  const [searchResults, setSearchResults] =
    useState<ProfileCompact[]>([]);
  const [input, setInput] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        const results = await searchPlayers(input);
        setSearchResults(results);
      } catch (error) {
        console.error("Failed to search for players", error)
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [input]);

  useEffect(() => {
    if (submitted) {
      setFocused(false);
      handleSubmitId();
    }
  }, [submitted]);

  const handleSelectPlayer = (id: string) => {
    if (id) {
      setInput(id);
      setSubmitted(true);
    }
  };

  const handleSubmitId = async () => {
    setIsLoading(true);
    setStatus("Calculating your potential, please wait ~15 seconds...");
    try {
      const playerData = await getPlayer(input);
      setData(playerData);
      setOriginalRecs(playerData.recs);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.detail) {
        setStatus(error.response.data.detail);
      } else {
        setStatus("Unexpected error, please try again. :(");
      }
      console.error(error)
    }
    setIsLoading(false);
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row w-full bg-card-light rounded-lg">
        <div className="flex justify-center items-center px-4 border-r-2">
          <img src={Images.beatleader} width={26} />
        </div>
        <input
          className={`flex flex-1 px-4 py-3 text-tx-light font-geist font-medium text-cbody bg-transparent outline-none truncate min-w-0 ${isLoading && "animate-pulse"}`}
          placeholder="Your BeatLeader Username or ID"
          type="search"
          value={input}
          maxLength={100}
          onFocus={() => setFocused(true)}
          onChange={(e) => setInput(e.target.value)}
          onSubmit={() => setSubmitted(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() !== "") {
              () => setSubmitted(true);
            }
          }}
          disabled={isLoading}
        />
        <button
          className={`w-[58px] h-[50px] flex justify-center items-center transition ${
            isLoading || input.trim() === ""
              ? "bg-blue-300 dark:bg-blue-300"
              : "bg-blue-light dark:bg-blue-dark px-4 py-3 hover:bg-blue-400 dark:hover:bg-sky-600"
          } rounded-l-none rounded-r-lg outline-none focus:outline-none`}
          onClick={() => setSubmitted(true)}
          disabled={isLoading || input.trim().length === 0}
        >
          {isLoading ? <LoadingSpinner /> : <Icons.search fill="white" />}
        </button>
      </div>
      {searchResults.length > 0 && focused && (
        <table className="w-full border-collapse rounded-lg overflow-hidden text-tx-light font-geist font-medium text-cbody slide-up">
          <tbody>
            {searchResults.map((player, index) => (
              <tr
                key={index}
                className="border-b-2 last:border-b-0 bg-card-light hover:bg-card-alt-light transition cursor-pointer"
                onClick={() => handleSelectPlayer(player.id)}
              >
                <td className="pl-4 py-2 font-semibold">
                  #{player.rank.toLocaleString()}
                </td>
                <td className="flex flex-row items-center gap-x-3 px-4 sm:px-2 py-2">
                  <img className="w-8 h-8 rounded-full bg-slate-600" src={player.avatar} />
                  <p className="font-semibold truncate">{player.alias ?? player.name}</p>
                </td>
                <td className="hidden sm:table-cell text-tx-alt text-right py-2 pr-4">
                  {player.pp.toLocaleString()}pp
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status && (
        <p className={`${!isLoading && "text-red-light dark:text-red-dark"}`}>
          {status}
        </p>
      )}
    </div>
  );
};

export default ProfileSearchBox;
