import { ObjectKey, leaderboard, score } from "./enums"
import { getLayer } from "./utils"
import { wrongScoreError, wrongScoreErrorGeneric } from "./utils"
const hash_sum = require("hash-sum");
import * as maths from "./maths";


// contains looked up score related data

export class ScoreData {
    id: number
    performance: number
    combo: number
    accuracy: number
    rating: string
    mods: string[]
    hits: {
        hit0: number,
        hit50: number,
        hit100: number,
        hit300: number
    }
    player: {
        id: number,
        username: string,
        rank: number
    }

    constructor() {
        this.id = 0;
        this.performance = 0;
        this.combo = 0;
        this.accuracy = 0;
        this.rating = '';
        this.mods = [];
        this.hits = {
            hit0: 0,
            hit50: 0,
            hit100: 0,
            hit300: 0
        };
        this.player = {
            id: 0,
            username: '',
            rank: 0
        }
    }
}

// contains layer data (leaderboards, length, etc)

export class Layer {
    identifier: ObjectKey;
    modCombos: string[][];
    length: number;
    filteredLength: number;
    leaderboards: leaderboard[];
    scores: score[];

    constructor() {
        this.identifier = "NM";
        this.modCombos = [['']];
        this.length = 0;
        this.filteredLength = 0;
        this.leaderboards = []
        this.scores = [];
    }
}

// contains beatmap metadata

export class Beatmap {
    id: number
    set_id: number
    artist: string
    title: string
    diffName: string
    playStats: {
        playcount: number,
        passcount: number
    }
    rankDate: {
        date: string,
        daysAgo: number
    }
    stats: {
        ar: number,
        bpm: number,
        cs: number,
        od: number,
        drain: number,
        maxCombo: number
    }

    constructor() {
        this.id = 0;
        this.set_id = 0;
        this.artist = '';
        this.title = '';
        this.diffName = '';
        this.playStats = {
            playcount: 0,
            passcount: 0
        }
        this.rankDate = {
            date: '',
            daysAgo: 0
        }
        this.stats = {
            ar: 0,
            bpm: 0,
            cs: 0,
            od: 0,
            drain: 0,
            maxCombo: 0
        }
    }

    public init(id: number, set_id: number, artist: string, title: string, diffName: string, playcount: number, passcount: number, maxCombo: number, date: string, daysAgo: number, ar: number, bpm: number, cs: number, od: number, drain: number) {
        this.id = id;
        this.set_id = set_id;
        this.artist = artist;
        this.title = title;
        this.diffName = diffName;
        this.playStats = {
            playcount: playcount,
            passcount: passcount
        }
        this.rankDate = {
            date: date,
            daysAgo: daysAgo
        }
        this.stats = {
            ar: ar,
            bpm: bpm,
            cs: cs,
            od: od,
            drain: drain,
            maxCombo: maxCombo
        }
    }


}

// contains mathematically outputed data (unr, avg, etc)

export class Results {
    uniqueness_rating: number
    layerAvg: number
    stdev: number
    timestamp: string
    hash: string

    constructor() {
        this.uniqueness_rating = 0;
        this.layerAvg = 0;
        this.stdev = 0;
        this.timestamp = ''
        this.hash = '';
    }
}

// main class

export class UniquenessRatingScore {
    scoreData: ScoreData
    layer: Layer
    beatmap: Beatmap
    results: Results

    constructor() {
        this.scoreData = new ScoreData();
        this.layer = new Layer();
        this.beatmap = new Beatmap()
        this.results = new Results();
    }

    public set_scoreData(scoreData: ScoreData) {
        this.scoreData = scoreData
    }

    public set_layer(leaderboards: leaderboard[]) {
        let l = getLayer(this.scoreData.mods);
        this.layer.leaderboards = leaderboards;
        this.layer.identifier = l.type;
        this.layer.modCombos = l.mods;
    }

    public set_beatmap(beatmap: Beatmap) {
        this.beatmap = beatmap;
    }

    public set_results() {
        this.results.timestamp = new Date().toUTCString();
        this.results.hash = hash_sum(this.results.timestamp + this.scoreData.id.toString())
    }

    public layer_combine() {
        this.layer.leaderboards.forEach((leaderboard) => {
            leaderboard.scores.forEach((score) => {
                this.layer.scores.push(score)
            })
        })
    }

    public layer_sort() {
        let tmp = [...this.layer.scores];
        this.layer.scores = tmp.sort((a, b) => a['performance'] - b['performance']).reverse()
    }

    public layer_filter(score_id?: number, user_id?: number) {
        this.layer.length = this.layer.scores.length;
        let copy = [...this.layer.scores];
        let filtered = [];
        if (score_id) {
            for (let index = 0; index < copy.length; index++) {
                const element = copy[index];
                element.score_id != score_id ? filtered.push(element) : null;
            }
        } else if (user_id) {
            for (let index = 0; index < copy.length; index++) {
                const element = copy[index];
                element.user_id != user_id ? filtered.push(element) : null;
            }
        }

        this.layer.scores = filtered;
        this.layer.filteredLength = filtered.length;
    }

    public deviate() {
        this.results.stdev = maths.getPerformanceStandardDeviation(this.layer.scores)
    }

    public average() {
        this.results.layerAvg = maths.getAveragePerformance(this.layer.scores, this.results.stdev)
    }

    public uniqueness_rating() {
        this.results.uniqueness_rating = maths.getUniqueness(this.scoreData.performance, this.results.layerAvg, this.layer.filteredLength, this.beatmap.playStats.playcount, this.beatmap.rankDate.daysAgo)
    }

    public checkScores() {
        this.layer.leaderboards.forEach((leaderboard) => {
            leaderboard.scores.forEach((checked_score) => {
                if (
                    !checked_score.mods ||
                    (!checked_score.performance && checked_score.performance != 0) ||
                    !checked_score.score_id
                )
                    wrongScoreErrorGeneric(checked_score, "Invalid score");
                let currLayer = getLayer(checked_score.mods);
                if (currLayer != getLayer(this.scoreData.mods))
                    wrongScoreError(checked_score, this.scoreData);
            });
        });
    }
}