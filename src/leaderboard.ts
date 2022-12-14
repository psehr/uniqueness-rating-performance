import { leaderboard, filterKey } from "./enums";

// combines different leaderboards into a single object

export function combineLeaderboards(leaderboards: leaderboard[]): leaderboard {
  let combinedLeaderboard: leaderboard = { sorted: false, scores: [] };
  leaderboards.forEach((leaderboard) => {
    leaderboard.scores.forEach((score) => {
      combinedLeaderboard.scores.push(score);
    });
  });
  return combinedLeaderboard;
}

// sort leaderboard using key "performance" | "score_id"

export function sortLeaderboard(
  leaderboard: leaderboard,
  key: filterKey
): leaderboard {
  const sortedScores = leaderboard.scores
    .sort((a, b) => a[key] - b[key])
    .reverse();
  let sortedLeaderboard = {
    sorted: true,
    scores: sortedScores,
  };
  return sortedLeaderboard;
}

// reduce leaderboard to a constrained size, or nuking a specific score_id

export function reduceLeaderboard(
  leaderboard: leaderboard,
  size?: number,
  score_id?: number
) {
  leaderboard.sorted
    ? null
    : console.warn(
        "Leaderboard is not sorted, you might want to avoid reducing it"
      );

  let reducedLeaderboard: leaderboard = {
    sorted: leaderboard.sorted,
    scores: leaderboard.scores,
  };

  if (size) {
    let realSize = Math.ceil((size / 100) * leaderboard.scores.length);
    reducedLeaderboard.scores = [];
    for (var i = 0; i < realSize; i++) {
      reducedLeaderboard.scores.push(leaderboard.scores[i]);
    }
  }

  if (score_id) {
    reducedLeaderboard.scores = reducedLeaderboard.scores.filter(
      (score) => score.score_id != score_id
    );
  }

  return reducedLeaderboard;
}
