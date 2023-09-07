import { leaderboard } from "./enums";

// get the performance standard deviation from sample leaderboard

export function getPerformanceStandardDeviation(leaderboard: leaderboard) {
  let stdev: number = 0;
  let variance: number = 0;
  let sample: number[] = [];

  leaderboard.scores.forEach((score) => {
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

export function getAveragePerformance(leaderboard: leaderboard) {
  let avg: number = 0;
  let sample: number[] = [];

  for (let index = 0; index < leaderboard.scores.length; index++) {
    const element = leaderboard.scores[index];
    sample.push(element.performance)
  }

  avg = (sample.reduce((a, b) => a + b, 0)) / (sample.length ? sample.length : 1);

  return avg;
}

export function getAveragePerformanceTest(leaderboard: leaderboard, stdev: number) {
  let avg: number = 0;
  let sample: number[] = [];

  for (let index = 0; index < leaderboard.scores.length; index++) {
    const element = leaderboard.scores[index];
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
  console.log(weights)

  avg = (weightedAverage(sample, weights));

  avg ? null : avg = 0;

  return avg;
}

// get the percentile of scores to keep from sample leaderboard's performance standard deviation

export function getPercentile(stdev: number) {
  let percentile = 2 / Math.log10(0.4 * Math.pow(stdev, 0.2)) - 8;
  percentile < 2 ? (percentile = 2) : null;
  percentile > 100 ? (percentile = 100) : null;
  percentile = parseFloat(percentile.toFixed(0));
  return percentile;
}

// get the uniqueness-rating from a layer's average performance and the sample performance

export function getUniqueness(avg: number, sample: number) {
  let uniqueness = 0;
  let x = sample / (avg + Math.pow(1, -20));
  uniqueness = (2.611 * Math.sqrt(Math.pow(x, 2))) / x + 62 * Math.atan(x);
  uniqueness = parseFloat(uniqueness.toFixed(2));
  return uniqueness;
}
