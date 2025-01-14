import axios from "axios";
import { Modifier, PlayerData, Recommendation } from "./types";

const api = "http://127.0.0.1:8000";

const fetchPlayer = async (playerId: string): Promise<PlayerData> => {
  const url = `${api}/recommendations/${playerId.trim()}`;
  const resp = await axios.get(url);
  const playerData = resp.data;
  return playerData;
};

const updateModifiers = async (
  mods: Modifier[],
  recs: Recommendation[],
  model: number[]
): Promise<Recommendation[]> => {
  const url = `${api}/modifiers`;
  const data = { mods, recs, model };
  const resp = await axios.put(url, data);
  const updatedRecs = resp.data;
  return updatedRecs;
};
