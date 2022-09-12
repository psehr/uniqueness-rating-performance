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
        console.warn(
          "Invalid score found, score_id: " +
            checked_score.score_id +
            ", Mods: " +
            checked_score.mods +
            ",  expected layer type '" +
            utils.getLayer(score).type +
            "'"
        );
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

// test zone

import { sample1 } from "./samples";

console.time("sample1");

console.log(unique(sample1.leaderboards, sample1.score));

console.timeEnd("sample1");
