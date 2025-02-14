import axios from "axios";
import {
  MLData,
  Modifier,
  PlayerData,
  ProfileCompact,
  Recommendation,
} from "./types";

const apiUrl = import.meta.env.VITE_API_URL;

export const searchPlayers = async (
  query: string = "",
  k: number = 5
): Promise<ProfileCompact[]> => {
  const url = `${apiUrl}/search/?query=${query}&k=${k}`;
  const resp = await axios.get(url, {
    timeout: 5000,
    timeoutErrorMessage: "Search request timed out",
  });
  const players = resp.data as ProfileCompact[];
  return players.sort((a, b) => a.rank - b.rank);
};

export const getPlayer = async (
  playerId: string,
  force: boolean = false
): Promise<PlayerData> => {
  const url = `${apiUrl}/recommendations/${playerId.trim()}?force=${force}`;
  const resp = await axios.get(url, {
    timeout: 60000,
    timeoutErrorMessage: "Get player request timed out",
  });
  const playerData = resp.data;
  return playerData;
};

export const updateMods = async (
  mods: Modifier[],
  recs: Recommendation[],
  model: number[]
): Promise<{ plot: MLData["plot"]; recs: Recommendation[] }> => {
  const url = `${apiUrl}/modifiers`;
  const data = {
    recs: recs,
    model: model,
    mods: mods,
  };
  const resp = await axios.put(url, data, {
    timeout: 7500,
    timeoutErrorMessage: "Update mods request timed out",
  });
  const updatedData = resp.data;
  return updatedData;
};
