const layerTypes = require("./layers.json");

export interface score {
  score_id: number;
  performance: number;
  mods: string[];
}

export interface leaderboard {
  sorted: boolean;
  scores: score[];
}

export interface layer {
  type: string;
  mods: string[][];
}

export interface uniqueness {
  score_id: number;
  rating: number;
  average: number;
  percentile: number;
  stdev: number;
  timestamp: string;
  hash: string;
}

export interface sample {
  score: score;
  leaderboards: leaderboard[];
}

const DTHR: layer = {
  type: "DTHR",
  mods: layerTypes.DTHR,
};

const DTFL: layer = {
  type: "DTFL",
  mods: layerTypes.DTFL
}

const FL: layer = {
  type: "FL",
  mods: layerTypes.FL,
};

const EZ: layer = {
  type: "EZ",
  mods: layerTypes.EZ,
};

const DT: layer = {
  type: "DT",
  mods: layerTypes.DT,
};

const HR: layer = {
  type: "HR",
  mods: layerTypes.HR,
};

const HD: layer = {
  type: "HD",
  mods: layerTypes.HD,
};

const HT: layer = {
  type: "HT",
  mods: layerTypes.HT,
};

const NM: layer = {
  type: "NM",
  mods: layerTypes.NM,
};

export const layers = {
  DTHR,
  DTFL,
  FL,
  EZ,
  DT,
  HR,
  HD,
  HT,
  NM,
};

export const layersLiteral = ["DTHR", "FL", "DTFL", "EZ", "DT", "HR", "HD", "HT", "NM"];

export type ObjectKey = keyof typeof layers;

export type filterKey = "score_id" | "performance";
