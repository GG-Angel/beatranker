export interface Prediction {
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
  difficultyName: string;
  type: string;
  stars: number;
  passRating: number;
  accRating: number;
  techRating: number;
  starsMod: number;
  passRatingMod: number;
  accRatingMod: number;
  techRatingMod: number;
  status: string;
  rank: number | null;
  timeAgo: string | null;
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

export type Predictions = Prediction[]