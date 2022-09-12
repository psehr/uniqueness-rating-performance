import * as enums from "./enums";
import * as utils from "./utils";
import * as lb from "./leaderboard";
import * as maths from "./maths";

export function unique(
  leaderboards: enums.leaderboard[],
  score: enums.score
): enums.uniqueness {
  let uniqueness: enums.uniqueness = {
    rating: 0,
    average: 0,
    percentile: 0,
    stdev: 0,
    timestamp: new Date().toUTCString(),
  };

  // layer checking (temp solution)

  leaderboards.forEach((leaderboard) => {
    leaderboard.scores.forEach((checked_score) => {
      let curr = utils.getLayer(checked_score);
      if (curr != utils.getLayer(score))
        scoreErrorhandler(checked_score, score);
    });
  });

  // #1 Combine

  let leaderboard = lb.combineLeaderboards(leaderboards);

  // #2 - Sort

  leaderboard = lb.sortLeaderboard(leaderboard, "performance");

  // #3 - Deviate
  uniqueness.stdev = maths.getPerformanceStandardDeviation(leaderboard);

  // #4 - Compute???

  uniqueness.percentile = maths.getPercentile(uniqueness.stdev);

  // #5 - Reduce

  leaderboard = lb.reduceLeaderboard(
    leaderboard,
    uniqueness.percentile,
    score.score_id
  );

  // #6 - Average

  uniqueness.average = maths.getAveragePerformance(leaderboard);

  // #Final - Compare

  uniqueness.rating = maths.getUniqueness(
    uniqueness.average,
    score.performance
  );

  return uniqueness;
}

function scoreErrorhandler(invalidScore: enums.score, score: enums.score) {
  throw Error("Invalid score at score_id: " + invalidScore.score_id, {
    cause:
      "expected layer type '" +
      utils.getLayer(score).type +
      "', got '" +
      invalidScore.mods +
      "'",
  });
}

// test zone

const invalidScore: enums.score = {
  score_id: 666,
  mods: ["HT"],
  performance: 2,
};

import { sample1 } from "./samples";

console.time("sample1");

let wrongLb = sample1.leaderboards;
wrongLb[0].scores.push(invalidScore);

console.log(unique(wrongLb, sample1.score));

console.timeEnd("sample1");

console.time("Dummy testing");

console.log(utils.evaluateCalc(800, 400));

console.timeEnd("Dummy testing");
