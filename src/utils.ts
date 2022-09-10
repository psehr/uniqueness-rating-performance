import * as enums from "./enums";
const layers = enums.layers;

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

// unfinished

export function combineLeaderboards(leaderboards: enums.leaderboard[]) {
  let combined: enums.leaderboard;
  leaderboards.forEach((leaderboard) => {
    leaderboard.scores.forEach((score) => {
      combined.scores.push(score);
    });
  });
}
