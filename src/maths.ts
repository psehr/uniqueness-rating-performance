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

  const sum = sample.reduce((acc, val) => acc + val);
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

  leaderboard.scores.forEach((score) => {
    sample.push(score.performance);
  });

  avg = sample.reduce((a, b) => a + b, 0) / sample.length;
  avg = Math.round(avg);

  return avg;
}

// get the percentile of scores to keep from sample leaderboard's performance standard deviation

export function getPercentile(stdev: number) {
  let percentile = 2 / Math.log10(0.6 * Math.pow(stdev, 0.2)) - 8;
  percentile < 2 ? (percentile = 2) : null;
  percentile > 100 ? (percentile = 100) : null;
  percentile = parseFloat(percentile.toFixed(0));
  return percentile;
}

// get the uniqueness-rating from a layer's average performance and the sample performance

export function getUniqueness(avg: number, sample: number) {
  let uniqueness = 0;
  avg == 0 ? (avg = Math.pow(1, -20)) : null;
  let x = Math.round(sample) / Math.round(avg);
  uniqueness = (2.611 * Math.sqrt(Math.pow(x, 2))) / x + 62 * Math.atan(x);
  uniqueness = parseFloat(uniqueness.toFixed(2));
  return uniqueness;
}
