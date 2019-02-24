// https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
function isCanadianPostalCode(s) {
  return /^[^DFIOQUWZdfioquwz]\d[^DFIOQUdfioqu]\s\d[^DFIOQUdfioqu]\d$/.test(s);
}

// https://www.regular-expressions.info/creditcard.html
function isVisa(s) {
  return /^4[0-9]{12}(?:[0-9]{3}){1,2}?$/.test(s);
}

// https://www.regular-expressions.info/creditcard.html
function isMasterCard(s) {
  return /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(s);
}

function isAdaFloat(s) {
  const decimal_literal = /^[0-9]+(\_[0-9]+)*(\.([0-9]+(\_[0-9]+)*))?([eE][+-]?[0-9]+(\_[0-9]+)*)?$/;
  const based_literal = /^([2-9]|1[0-6])#[0-9A-Fa-f]+(\_[0-9A-Fa-f]+)*(\.([0-9A-Fa-f]+(\_[0-9A-Fa-f]+)*))?#([eE][+-]?[0-9]+(\_[0-9]+)*)?$/;
  const numeric_literal = new RegExp("(" + based_literal.source + ")|(" + decimal_literal.source + ")");
  return numeric_literal.test(s);
}

function isNotThreeEndingInOO(s) {
  return /^([a-nA-N]*[p-zP-Z]*)*[oO]?([a-nA-N]*[p-zP-Z]*)*$/.test(s);
}

function isDivisibleBy32(s) {
  return /^0{1,4}$|[01]*00000$/.test(s);
}

function isTwoThroughThirtySix(s) {
  return /^\b([2-9]|[12][0-9]|3[0-6])\b$/.test(s);
}

function isMLComment(s) {
  return /^\(\*((?!\(\*.*\*\)).)*\*\)$/.test(s);
}

// Works! Full expression: ^f[^io][a-zA-Z]*$|^fi[^ln][a-zA-Z]*$|^fil[^e][a-zA-Z]*$|^file[a-zA-Z]+$|^fin[^d][a-zA-Z]*$|^find[a-zA-Z]+$|^fo[^r][a-zA-Z]*$|^for[a-zA-Z]+$|^[^f]+[a-zA-Z]*$|^f$|^fo$|^fi$|^fin$|^fil$
function isNotForFileFindNoLookAround(s) {
  const not_file = /^f[^io][a-zA-Z]*$|^fi[^ln][a-zA-Z]*$|^fil[^e][a-zA-Z]*$|^file[a-zA-Z]+$/;
  const not_find = /^fin[^d][a-zA-Z]*$|^find[a-zA-Z]+$/;
  const not_for = /^fo[^r][a-zA-Z]*$|^for[a-zA-Z]+$/;
  const not_start_with_f = /^[^f]+[a-zA-Z]*$/;
  const substrings = /^f$|^fo$|^fi$|^fin$|^fil$/;
  const empty_string = /^$/;
  const basic_latin = new RegExp(not_file.source + "|" + not_find.source + "|" + not_for.source + "|" + not_start_with_f.source + "|" + substrings.source + "|" + empty_string.source);
  return basic_latin.test(s);
}

function isNotForFileFindWithLookAround(s) {
  return /^(?!(for|file|find)$).*$/.test(s);

}

module.exports = {
  isCanadianPostalCode,
  isVisa,
  isMasterCard,
  isAdaFloat,
  isNotThreeEndingInOO,
  isDivisibleBy32,
  isTwoThroughThirtySix,
  isMLComment,
  isNotForFileFindNoLookAround,
  isNotForFileFindWithLookAround,
};
