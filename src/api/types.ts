type Difficulty = "ExpertPlus" | "Expert" | "Hard" | "Normal" | "Easy";
type MapType = "Midspeed" | "Speed" | "Acc" | "Tech";
type Status = "played" | "unplayed";

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
  rank: number | null;
  timeAgo: string | null;
  timePost: number | null;
  currentMods: string[] | null;
  predictedMods: string[] | null;
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
}

export interface APIResponse {
  profile: Profile;
  recs: Recommendation[];
}