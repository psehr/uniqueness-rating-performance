import { unique } from "./unique";
import * as utils from "./utils";

import { sample1, sample2, sample3, sample4, sample5 } from "./samples";

console.time("sample1");

// let wrongLb = sample2.leaderboards;
// wrongLb[0].scores.push(invalidScore);

// console.log(unique(sample1.leaderboards, sample1.score));
// console.log(unique(sample2.leaderboards, sample2.score));
// console.log(unique(sample3.leaderboards, sample3.score));
// console.log(unique(sample4.leaderboards, sample4.score));
console.log(unique(sample5.leaderboards, sample5.score));

console.timeEnd("sample1");

// console.time("Dummy testing");

// console.log(utils.evaluateCalc(800, 400));

// console.timeEnd("Dummy testing");
