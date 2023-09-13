import * as score from "./score"

export function unique(unrScore: score.UniquenessRatingScore) {
  unrScore.set_results(); // initializing results (hash & timestamp)
  unrScore.checkScores(); // verifying layerType validity in scores
  unrScore.layer_combine(); // setting scores
  unrScore.layer_sort(); // sorting scores by performance
  unrScore.layer_filter(unrScore.scoreData.id, unrScore.scoreData.player.id); // filtering out player scores
  unrScore.evalReliability();
  unrScore.deviate() // setting stdev in results
  unrScore.average() // setting layerAvg in results
  unrScore.uniqueness_rating(); // setting unr in results
}
