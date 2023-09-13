const layerTypes = require("./layers.json");

export interface score {
  user_id: number;
  score_id: number;
  performance: number;
  mods: string[];
}

export interface leaderboard {
  scores: score[];
}

export interface layer {
  type: ObjectKey;
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

export interface uniquenessExperimental {
  score: {
    id: number,
    performance: number,
    combo: number,
    accuracy: number,
    rating: string
    hits: {
      hit0: number,
      hit50: number,
      hit100: number,
      hit300: number
    }
    player: {
      id: number,
      username: string,
      rank: number
    }
  },
  layer: {
    identifier: ObjectKey,
    modCombos: [[string]]
    length: number,
    filteredLength: number,
    leaderboards: leaderboard[]
  }
  beatmap: {
    id: number,
    set_id: number,
    artist: string,
    title: string,
    diffName: string,
    playcount: number,
    maxCombo: number,
    rankDate: {
      date: string,
      daysAgo: number
    }
  }
  results: {
    uniqueness_rating: number,
    layerAvg: number,
    stdev: number,
    timestamp: string,
    hash: string
  }
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

export type Meta = {
  beatmap: {
    beatmapset_id: number,
    beatmap_id: number,
    artist: string,
    title: string,
    diffName: string,
    maxCombo: number,
    playcount: number,
    rankDate: {
      date: string,
      daysAgo: number
    }
  },
  player: {
    player: string,
    player_id: number,
  },
  score: {
    mods: string[],
    pp: number,
    accuracy: number,
    hits: {
      count0: number,
      count50: number,
      count100: number,
      count300: number
    },
    combo: number
  }
}
