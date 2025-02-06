import { useContext, useEffect, useState } from "react";
import { Icons, Images } from "../constants";
import axios from "axios";
import { LoadingSpinner } from "./LoadingSpinner";
import { getPlayer } from "../api/beatranker";
import GlobalContext from "../context/GlobalContext";
import { searchPlayers, SearchPlayersResponse } from "../api/beatleader";

const mockResults: SearchPlayersResponse = [
  {
    id: "3225556157461414",
    name: "Bizzy825",
    alias: null,
    avatar: "https://cdn.assets.beatleader.xyz/3225556157461414R39.png",
    rank: 1,
    pp: 6123,
  },
  {
    id: "1922350521131465",
    name: "#StopAbusingModifiersForFreePP",
    alias: null,
    avatar: "https://cdn.assets.beatleader.com/1922350521131465R17.png",
    rank: 2,
    pp: 7123,
  },
  {
    id: "2169974796454690",
    name: "brody from 0piumb0ys",
    alias: "bytesy",
    avatar: "https://cdn.assets.beatleader.com/2169974796454690R13.png",
    rank: 3,
    pp: 7123,
  },
  {
    id: "76561198988695829",
    name: "OlbmaPhlee",
    alias: null,
    avatar: "https://cdn.assets.beatleader.com/76561198988695829R23.png",
    rank: 4,
    pp: 7123.12,
  },
  {
    id: "76561199486405949",
    name: "soni",
    alias: "soni",
    avatar: "https://cdn.assets.beatleader.com/76561199486405949R14.png",
    rank: 5,
    pp: 7123,
  },
  {
    id: "76561198404774259",
    name: "SilentBang",
    alias: null,
    avatar: "https://cdn.assets.beatleader.xyz/76561198404774259R14.png",
    rank: 6,
    pp: 6123,
  },
  {
    id: "76561198186151129",
    name: "ACC | Pandita",
    alias: null,
    avatar: "https://cdn.assets.beatleader.xyz/76561198186151129R19.png",
    rank: 7,
    pp: 7123,
  },
  {
    id: "76561199104169308",
    name: "thinking",
    alias: "thinkingswag",
    avatar: "https://cdn.assets.beatleader.xyz/76561199104169308R23.png",
    rank: 8,
    pp: 7123,
  },
  {
    id: "76561198960449289",
    name: "aqua",
    alias: null,
    avatar: "https://cdn.assets.beatleader.xyz/76561198960449289R49.png",
    rank: 9,
    pp: 12383.21,
  },
  {
    id: "2769016623220259",
    name: "NailikLP",
    alias: null,
    avatar: "https://cdn.assets.beatleader.xyz/2769016623220259.png",
    rank: 10,
    pp: 12383.21,
  },
];

const ProfileSearchBox = () => {
  const { setData, setOriginalRecs, isLoading, setIsLoading } =
    useContext(GlobalContext);
  const [searchResults, setSearchResults] =
    useState<SearchPlayersResponse>([]);
  const [input, setInput] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        const results = await searchPlayers(input);
        setSearchResults(results);
        setStatus("")
      } catch (error) {
        console.error("Failed to search for players", error)
      }
    }, 1000); // 1 seconds

    return () => clearTimeout(delay);
  }, [input]);

  useEffect(() => {
    if (submitted) {
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
          className={`flex flex-1 px-4 py-3 bg-card-light text-tx-light font-geist font-medium text-cbody bg-transparent outline-none truncate min-w-0`}
          placeholder="Your BeatLeader Username or ID"
          type="search"
          value={input}
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
      {searchResults && !submitted && (
        <table className="w-full border-collapse rounded-lg overflow-hidden text-tx-light font-geist font-medium text-cbody">
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
                <td className="flex flex-row items-center gap-x-2 px-4 sm:px-2 py-2">
                  <img className="w-8 h-8 rounded-full" src={player.avatar} />
                  <td className="font-semibold truncate">{player.alias ?? player.name}</td>
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
