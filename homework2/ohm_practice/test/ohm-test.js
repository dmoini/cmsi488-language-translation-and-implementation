const assert = require("assert");
const o = require("../ohm");

const FIXTURE = {
    isCanadianPostalCode: {
      good: ["A7X 2P8", "P8E 4R2"],
      bad: ["A7X   9B2", "C7E9U2", "", "Dog"],
    },
    isVisa: {
      good: ["4128976567772613", "4089655522138888"],
      bad: ["43333", "42346238746283746823"],
    },
    isMasterCard: {
      good: ["5100000000000000", "5294837679998888"],
      bad: ["5763777373890002", "513988843211541", "5432333xxxxxxxxx"],
    },
    isAdaFloat: {
      good: ["1", "23_5", "4#20#", "13#fD34_2_1#", "1.3e2", "11_3.3_3_222E-199"],
      bad: ["dog", "4fe", "p#ii#", "_", "_33", "5__2", "9#88#E-1e3", "-6"],
    },
    isNotThreeEndingInOO: {
      good: ["", "fog", "Tho"],
      bad: ["fOo", "gOO"],
    },
    isDivisibleBy32: {
      good: ["0", "110100000"],
      bad: ["1", "0000000010000", "1000000001"],
    },
    isTwoThroughThirtySix: {
      good: Array(35)
        .fill(0)
        .map((x, i) => i + 2),
      bad: ["1", "0", "00003", "dog", "361"],
    },
    isMLComment: {
      good: ["(**)", "(*  *)", "(*756****)"],
      bad: ["", "(*)", "(* before (* inner *) after *)"],
    },
    isNotForFileFindNoLookAround: {
      good: ["", "files", "fors", "dog", "f", "fi", "fo", "fil", "fin", "FOR", "FILE", "FIND"],
      bad: ["for", "file", "find"],
    },
  };
  
  // Looks funny, but you can probably figure out what it does
  FIXTURE.isNotForFileFindWithLookAround = FIXTURE.isNotForFileFindNoLookAround;
  
  describe("In the regex tester", () => {
    Object.entries(o).forEach(([name, matchingFunction]) => {
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
  