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
    percentile: 0,
    stdev: 0,
    timestamp: new Date().toUTCString(),
  };

  // layer checking

  leaderboards.forEach((leaderboard) => {
    leaderboard.scores.forEach((checked_score) => {
      let curr = utils.getLayer(checked_score);
      if (curr != utils.getLayer(score))
        console.warn(
          "Invalid layer found, score_id: " +
            checked_score.score_id +
            ", Mods: " +
            checked_score.mods
        );
    });
  });

  // UNFINISHED

  let leaderboard = lb.combineLeaderboards(leaderboards);
  console.log(leaderboard);

  return uniqueness;
}

// test zone

const score_test = utils.randomScoreGenerator();
console.log(score_test);

let lb1 = utils.randomLeaderboardGenerator(5);
let lb2 = utils.randomLeaderboardGenerator(5);
let lb3 = utils.randomLeaderboardGenerator(5);
lb1.scores.push(score_test);
let uniqueness = unique([lb1, lb2, lb3], score_test);
console.log(uniqueness);
