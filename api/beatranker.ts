import axios from "axios";
import { MLData, Modifier, PlayerData, Recommendation } from "./types";

const apiUrl = import.meta.env.VITE_API_URL;

export const getPlayer = async (
  playerId: string,
  force: boolean = false
): Promise<PlayerData> => {
  const url = `${apiUrl}/recommendations/${playerId.trim()}?force=${force}`;
  const resp = await axios.get(url, {
    timeout: 30000,
    timeoutErrorMessage: "Request timed out",
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
    timeoutErrorMessage: "Request timed out",
  });
  const updatedData = resp.data;
  return updatedData;
};
