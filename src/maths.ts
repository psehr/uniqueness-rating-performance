import { leaderboard, score } from "./enums";

// get the performance standard deviation from sample leaderboard

export function getPerformanceStandardDeviation(scores: score[]) {
  let stdev: number = 0;
  let variance: number = 0;
  let sample: number[] = [];

  scores.forEach((score) => {
    sample.push(score.performance);
  });

  // what the hell is this (it works)

  if (!sample.length) return 0;

  const sum = sample?.reduce((acc, val) => acc + val);
  const { length: num } = sample;
  const median = sum / num;
  sample.forEach((num) => {
    variance += (num - median) * (num - median);
  });
  variance /= num;
  stdev = Math.sqrt(variance);
  stdev = parseFloat(stdev.toFixed(1));

  return stdev;
}

// get average performance from sample leaderboard

export function getAveragePerformance(scores: score[], stdev: number) {
  let avg: number = 0;
  let sample: number[] = [];

  for (let index = 0; index < scores.length; index++) {
    const element = scores[index];
    sample.push(element.performance)
  }

  const getSteepness = (stdev: number) => {
    return (1 + stdev / 200)
  }

  const createWeights = (nums: number[], steepness: number) => {
    let weights: number[] = [1]
    for (let index = 0; index < nums.length - 1; index++) {
      weights[index] < 0.0001 ? weights.push(0) : weights.push(weights[index] / steepness)
    }
    return weights
  }

  const weightedAverage = (nums: number[], weights: number[]) => {
    const [sum, weightSum] = weights.reduce(
      (acc, w, i) => {
        acc[0] = acc[0] + nums[i] * w;
        acc[1] = acc[1] + w;
        return acc;
      },
      [0, 0]
    );
    return parseFloat((sum / weightSum).toFixed(2));
  };

  let weights = createWeights(sample, getSteepness(stdev))

  avg = (weightedAverage(sample, weights));

  avg ? null : avg = 0;

  return avg;
}

export function getReliabilityIndex(layerLength: number) {
  let r_i = parseFloat((0.06 * layerLength).toFixed(0))
  r_i > 10 ? r_i = 10 : null;
  return r_i;
}

export function getUniqueness(score_performance: number, layer_performance: number, layer_length: number, beatmap_playcount: number, beatmap_rankedago: number) {
  let uniqueness_rating = 0;
  let t = 0
  let c = 0;
  let d = ((300 - layer_length) / 300);
  (score_performance > layer_performance) ? (t = d + 1) : (t = 1 - d);
  (layer_length > 0) ? c = ((score_performance + 0.1) * t) / (layer_performance + 0.1) : c = ((score_performance + 0.1) / (layer_performance + 0.1)) * (beatmap_playcount / Math.pow(beatmap_rankedago, 2.2));
  uniqueness_rating = 63.661977237 * Math.atan(c);
  uniqueness_rating = parseFloat(uniqueness_rating.toFixed(2));
  return uniqueness_rating;
}
