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
  rating: number;
  percentile: number;
  stdev: number;
  timestamp: string;
}

const DTHR: layer = {
  type: "DTHR",
  mods: layerTypes.DTHR,
};

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
  FL,
  EZ,
  DT,
  HR,
  HD,
  HT,
  NM,
};

export const layersLiteral = ["DTHR", "FL", "EZ", "DT", "HR", "HD", "HT", "NM"];

export type ObjectKey = keyof typeof layers;

export type filterKey = "score_id" | "performance";
