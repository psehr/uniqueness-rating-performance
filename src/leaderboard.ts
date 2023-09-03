import { leaderboard, filterKey, score } from "./enums";

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
  key: filterKey,
): leaderboard {
  let sortedScores = leaderboard.scores
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
  size: number,
  score: score
) {
  leaderboard.sorted
    ? null
    : console.warn(
      "Leaderboard is not sorted, you might want to avoid reducing it"
    );
  let duplicateLeaderboard = [...leaderboard.scores];
  let idProcessedLeaderboard = [];

  for (let index = 0; index < duplicateLeaderboard.length; index++) {
    const element = duplicateLeaderboard[index];
    element.score_id != score.score_id ? idProcessedLeaderboard.push(element) : null
  }

  if (idProcessedLeaderboard.length == 0) idProcessedLeaderboard.push(score)

  const finalSize = Math.ceil(size / 100 * idProcessedLeaderboard.length)

  const finalLbScores = idProcessedLeaderboard.slice(0, finalSize)

  return {
    sorted: leaderboard.sorted,
    scores: finalLbScores
  }
}
