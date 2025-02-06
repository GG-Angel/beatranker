import axios from "axios";

const apiUrl = "https://api.beatleader.xyz";

export type SearchPlayersResponse = {
  id: string;
  name: string;
  alias: string | null;
  avatar: string;
  rank: number;
  pp: number;
}[];

export const searchPlayers = async (
  username: string = ""
): Promise<SearchPlayersResponse> => {
  const url = `${apiUrl}/players?page=1&count=5&search=${username.trim()}`;
  const resp = await axios.get(url);
  const data = resp.data.data;
  const players: SearchPlayersResponse = data.map(
    ({ id, name, alias, avatar, rank, pp }: any) => ({
      id,
      name,
      alias,
      avatar,
      rank,
      pp,
    })
  );
  return players.sort((a, b) => a.rank - b.rank);
};
