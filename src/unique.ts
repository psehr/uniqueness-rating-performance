import * as enums from "./enums";
import * as utils from "./utils";
import * as lb from "./leaderboard";
import * as maths from "./maths";

const hash_sum = require("hash-sum");

export function unique(
  leaderboards: enums.leaderboard[],
  score: enums.score
): enums.uniqueness {
  let uniqueness: enums.uniqueness = {
    score_id: score.score_id,
    rating: 0,
    average: 0,
    percentile: 0,
    stdev: 0,
    timestamp: new Date().toUTCString(),
    hash: "",
  };

  uniqueness.hash = hash_sum(
    uniqueness.timestamp.toString() + uniqueness.score_id.toString()
  );

  // Checking scores

  leaderboards.forEach((leaderboard) => {
    leaderboard.scores.forEach((checked_score) => {
      if (
        !checked_score.mods ||
        (!checked_score.performance && checked_score.performance != 0) ||
        !checked_score.score_id
      )
        wrongScoreErrorGeneric(checked_score, "Invalid score");
      let currLayer = utils.getLayer(checked_score);
      if (currLayer != utils.getLayer(score))
        wrongScoreError(checked_score, score);
    });
  });

  // #1 Combine

  let leaderboard = lb.combineLeaderboards(leaderboards);

  // #2 - Sort

  let leaderboardStage2 = lb.sortLeaderboard(leaderboard, "performance");
  leaderboard = {
    sorted: leaderboardStage2.sorted,
    scores: [...leaderboardStage2.scores]
  }

  // #3 - Deviate

  uniqueness.stdev = maths.getPerformanceStandardDeviation(leaderboard);

  // #4 - Reduce

  let leaderboardStage5 = lb.reduceLeaderboardTest(
    leaderboard,
    score
  );

  leaderboard = {
    sorted: leaderboardStage5.sorted,
    scores: [...leaderboardStage5.scores]
  }

  // #6 - Average

  uniqueness.average = maths.getAveragePerformanceTest(leaderboard, uniqueness.stdev)

  // #Final - Compare

  uniqueness.rating = maths.getUniqueness(
    uniqueness.average,
    score.performance
  );

  return uniqueness;
}

function wrongScoreError(invalidScore: enums.score, score: enums.score) {
  throw Error("Invalid score layer at score_id: " + invalidScore.score_id, {
    cause:
      "expected layer type '" +
      utils.getLayer(score).type +
      "', got '" +
      invalidScore.mods +
      "'",
  });
}

function wrongScoreErrorGeneric(invalidScore: enums.score, msg: string) {
  throw TypeError(msg, { cause: invalidScore });
}
