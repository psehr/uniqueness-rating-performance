import * as enums from "./enums";
import { getUniqueness } from "./maths";
const hash_sum = require("hash-sum");
const layers = enums.layers;

// returns layer from score

export function getLayer(score: enums.score): enums.layer {
  const mods = score.mods;
  if (mods.includes("HR") && (mods.includes("DT") || mods.includes("NC")) && !(mods.includes("FL")))
    return layers.DTHR;
  if (mods.includes("HT")) return layers.HT;
  if (mods.includes("FL") && !(mods.includes("DT") || mods.includes("NC"))) return layers.FL;
  if (mods.includes("FL") || (mods.includes("FL") && mods.includes("HR"))) return layers.DTFL
  if (mods.includes("EZ")) return layers.EZ;
  if (mods.includes("DT") || mods.includes("NC")) return layers.DT;
  if (mods.includes("HR")) return layers.HR;
  if (mods.includes("HD")) return layers.HD;
  return layers.NM;
}

// util

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

// leaderboard generator for testing

export function randomLeaderboardGenerator(
  amount: number,
  customLayerType?: string,
  customMods?: string[]
): enums.leaderboard {
  let leaderboard: enums.leaderboard = { sorted: false, scores: [] };
  for (let index = 0; index < amount; index++) {
    let layerType =
      (customLayerType as enums.ObjectKey) ||
      (enums.layersLiteral[getRandomInt(8)] as enums.ObjectKey);
    let layer = layers[layerType];
    const modCombo = customMods || layer.mods[getRandomInt(layer.mods.length)];
    const score_id = getRandomInt(1000000);
    const performance = getRandomInt(1000);
    let score: enums.score = {
      mods: modCombo,
      score_id: score_id,
      performance: performance,
    };
    leaderboard.scores.push(score);
  }
  return leaderboard;
}

// midget

export function randomScoreGenerator(
  customLayerType?: string,
  customMods?: string[]
) {
  return randomLeaderboardGenerator(1, customLayerType, customMods).scores[0];
}

// eval function for testing purpose on dummy values

export function evaluateCalc(
  dummyPerformance: number,
  dummyLayerAverage: number
) {
  let uniqueness: enums.uniqueness = {
    score_id: 0,
    rating: getUniqueness(dummyLayerAverage, dummyPerformance),
    average: dummyLayerAverage,
    percentile: NaN,
    stdev: NaN,
    timestamp: new Date().toUTCString(),
    hash: "",
  };

  uniqueness.hash = hash_sum(uniqueness.timestamp.toString());
  return uniqueness;
}
