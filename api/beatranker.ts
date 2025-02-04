import axios from "axios";
import { MLData, Modifier, PlayerData, Recommendation } from "./types";

const api = "http://127.0.0.1:8000";

export const getPlayer = async (playerId: string): Promise<PlayerData> => {
  const url = `${api}/recommendations/${playerId.trim()}`;
  const resp = await axios.get(url);
  const playerData = resp.data;
  return playerData;
};

export const updateMods = async (
  mods: Modifier[],
  recs: Recommendation[],
  model: number[]
): Promise<{ plot: MLData["plot"]; recs: Recommendation[] }> => {
  const url = `${api}/modifiers`;
  const data = {
    recs: recs,
    model: model,
    mods: mods,
  };
  const resp = await axios.put(url, data);
  const updatedData = resp.data;
  return updatedData;
};
