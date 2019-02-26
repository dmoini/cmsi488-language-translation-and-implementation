const assert = require("assert");
const r = require("../regex");

const FIXTURE = {
  isCanadianPostalCode: {
    good: ["A7X 2P8", "P8E 4R2", "L6A 1W9", "M4V 1X2", "X0E 0P0"],
    bad: ["A7X   9B2", "C7E9U2", " A7X 2P8", "", "Dog", "??? ???", "@1@ 2@3"],
  },
  isVisa: {
    good: ["4128976567772613", "4089655522138888", "4897504976690676", "4101838453837570", "4326327739740369"],
    bad: ["43333", "42346238746283746823", " 4128976567772613", "5128976567772613"],
  },
  isMasterCard: {
    good: ["5100000000000000", "5294837679998888", "5300142109418209", "5483343657053980", "5587951178088436"],
    bad: ["5763777373890002", "513988843211541", "5432333xxxxxxxxx", " 5300142109418209", "1300142109418209"],
  },
  isAdaFloat: {
    good: ["1", "23_5", "4#20#", "13#fD34_2_1#", "1.3e2", "11_3.3_3_222E-199"],
    bad: ["dog", "4fe", "p#ii#", "_", "_33", "5__2", "9#88#E-1e3", "-6"],
  },
  isNotThreeEndingInOO: {
    good: ["", "fog", "Tho", "toodle", "thoo", "moOd"],
    bad: ["fOo", "gOO", "too", "coO"],
  },
  isDivisibleBy32: {
    good: ["0", "00", "000", "0000", "0000000000000000000","110100000", "1000000000001000000", "010101010101010011010100000"],
    bad: ["1", "0000000010000", "1000000001", " 110100000", "110100000 ", "1101 00000", "200000", "a00000"],
  },
  isTwoThroughThirtySix: {
    good: Array(35).fill(0).map((x, i) => i + 2),
    bad: ["1", "0", "00003", "dog", "361", "37", " 4", "4 ", "3 6", "-8"],
  },
  isMLComment: {
    good: ["(**)", "(*  *)", "(*756****)", "(* c o m m e n t *)", "(* (* *)", "(* * (* (* (* *)"],
    bad: ["", "(*)", "(* before (* inner *) after *)", " (**)"],
  },
  isNotForFileFindNoLookAround: {
    good: ["", "files", "fors", "dog", "f", "fi", "fo", "fil", "fin", "FOR", "FILE", "FIND", "fILe", "FoR", "FiNd", "fInd"],
    bad: ["for", "file", "find", "2", "f0r", "@for"],
  },
};

// Looks funny, but you can probably figure out what it does
FIXTURE.isNotForFileFindWithLookAround = FIXTURE.isNotForFileFindNoLookAround;

describe("In the regex tester", () => {
  Object.entries(r).forEach(([name, matchingFunction]) => {
    describe(`the function ${name}`, () => {
      FIXTURE[name].good.forEach(s => {
        it(`accepts ${s}`, () => {
          assert.ok(matchingFunction(s));
        });
      });
      FIXTURE[name].bad.forEach(s => {
        it(`rejects ${s}`, () => {
          assert.ok(!matchingFunction(s));
        });
      });
    });
  });
});
