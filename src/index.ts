import * as enums from "./enums";

export function unique(leaderboards: enums.leaderboard[], score: enums.score) {
  // boom goes here
}

// test zone

const score_test: enums.score = {
  score_id: 1,
  performance: 84,
  mods: ["HR", "HD"],
};

import { getLayer } from "./utils";

console.log(getLayer(score_test));
