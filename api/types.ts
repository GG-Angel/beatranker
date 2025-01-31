export type Modifier = "SF" | "FS" | "GN" | "NB" | "NO" | "SS" | "NA";
export type Difficulty = "ExpertPlus" | "Expert" | "Hard" | "Normal" | "Easy";
export type MapType = "Midspeed" | "Speed" | "Acc" | "Tech";
export type Status = "played" | "unplayed";

export interface Recommendation {
  leaderboardId: string;
  songId: string;
  cover: string;
  fullCover: string;
  name: string;
  subName: string | null;
  author: string;
  mapper: string;
  bpm: number;
  duration: number;
  difficultyName: Difficulty;
  type: MapType;
  stars: number;
  passRating: number;
  accRating: number;
  techRating: number;
  starsMod: number;
  passRatingMod: number;
  accRatingMod: number;
  techRatingMod: number;
  status: Status;
  isFiltered: boolean;
  rank: number | null;
  timeAgo: string | null;
  timePost: number | null;
  currentMods: Modifier[] | null;
  predictedMods: Modifier[] | null;
  currentAccuracy: number;
  predictedAccuracy: number;
  accuracyGained: number;
  currentPP: number;
  predictedPP: number;
  maxPP: number;
  unweightedPPGain: number;
  weightedPPGain: number;
  weight: number;
}

export interface Profile {
  id: string;
  name: string;
  alias: string;
  avatar: string;
  country: string;
  pp: number;
  rank: number;
  countryRank: number;
  bestPP: number;
  bestRank: number;
  medianPP: number;
  medianRank: number;
}

export interface MLData {
  model: number[];
  plot: string;
  lastMapRefresh: string;
}

export interface PlayerData {
  profile: Profile;
  recs: Recommendation[];
  ml: MLData;
}
