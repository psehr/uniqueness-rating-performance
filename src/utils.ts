import * as enums from "./enums";
import { getUniqueness } from "./maths";
const layers = enums.layers;
import * as score from "./score"

// returns layer from mods

export function getLayer(mods: string[]): enums.layer {
  if (mods.includes("HR") && ((mods.includes("DT") || mods.includes("NC"))) && !(mods.includes("FL")))
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

// invalid layer error

export function wrongScoreError(invalidScore: enums.score, score: score.ScoreData) {
  throw Error("Invalid score layer at score_id: " + invalidScore.score_id, {
    cause:
      "expected layer type '" +
      getLayer(score.mods).type +
      "', got '" +
      invalidScore.mods +
      "'",
  });
}

// default error

export function wrongScoreErrorGeneric(invalidScore: enums.score, msg: string) {
  throw TypeError(msg, { cause: invalidScore });
}
