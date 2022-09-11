import * as enums from "./enums";
const layers = enums.layers;

// returns layer from score

export function getLayer(score: enums.score): enums.layer {
  const mods = score.mods;
  if (mods.includes("HR") && (mods.includes("DT") || mods.includes("NC")))
    return layers.DTHR;
  if (mods.includes("FL") && !mods.includes("HT")) return layers.FL;
  if (mods.includes("EZ") && !mods.includes("HT")) return layers.EZ;
  if (mods.includes("DT") || mods.includes("NC")) return layers.DT;
  if (mods.includes("HR") && !mods.includes("HT")) return layers.HR;
  if (mods.includes("HD") && !mods.includes("HT")) return layers.HD;
  if (mods.includes("HT")) return layers.HT;
  return layers.NM;
}

// util

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

// leaderboard generator for testing

export function randomLeaderboardGenerator(amount: number): enums.leaderboard {
  let leaderboard: enums.leaderboard = { sorted: false, scores: [] };
  for (let index = 0; index < amount; index++) {
    let layerType = enums.layersLiteral[getRandomInt(8)] as enums.ObjectKey;
    let layer = layers[layerType];
    const modCombo = layer.mods[getRandomInt(layer.mods.length)];
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

export function randomScoreGenerator() {
  return randomLeaderboardGenerator(1).scores[0];
}
