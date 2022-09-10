const layerTypes = require("./layers.json");

export interface score {
  score_id: Number;
  performance: Number;
  mods: String[];
}

export interface leaderboard {
  scores: score[];
}

export interface layer {
  type: String;
  mods: String[][];
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
