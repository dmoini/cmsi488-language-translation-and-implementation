// https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
function isCanadianPostalCode(s) {
  return /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s\d[ABCEGHJ-NPRSTV-Z]\d$/.test(s);
}

// https://www.regular-expressions.info/creditcard.html
function isVisa(s) {
  return /^4[0-9]{12}([0-9]{3})?$/.test(s);
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
  return /^[a-zA-Z][a-nA-Np-zP-Z]{2}$|^[a-zA-Z]{2}[a-nA-Np-zP-Z]$|^[a-zA-Z][a-nA-Np-zP-Z][a-zA-Z]$|^[a-zA-Z]{0,2}$|^[a-zA-Z]{4,}$/.test(s);
}

function isDivisibleBy32(s) {
  return /^0{1,}$|^[01]*00000$/.test(s);
}

function isTwoThroughThirtySix(s) {
  return /^\b([2-9]|[12][0-9]|3[0-6])\b$/.test(s);
}

function isMLComment(s) {
  return /^\(\*((?!\*\)).)*\*\)$/.test(s);
}

function isNotForFileFindNoLookAround(s) {
  const not_file = /^f[a-hj-np-zA-Z][a-zA-Z]*$|^fi[a-kmo-zA-Z][a-zA-Z]*$|^fil[a-df-zA-Z][a-zA-Z]*$|^file[a-zA-Z]+$/;
  const not_find = /^fin[a-ce-zA-Z][a-zA-Z]*$|^find[a-zA-Z]+$/;
  const not_for = /^fo[a-qs-zA-Z][a-zA-Z]*$|^for[a-zA-Z]+$/;
  const not_start_with_f = /^[a-eg-zA-Z][a-zA-Z]*$/;
  const substrings = /^$|^f$|^fo$|^fi$|^fin$|^fil$/;
  const basic_latin = new RegExp(not_file.source + "|" + not_find.source + "|" + not_for.source + "|" + not_start_with_f.source + "|" + substrings.source);
  return basic_latin.test(s);
}

function isNotForFileFindWithLookAround(s) {
  return /^(?!(for|file|find)$)[a-zA-Z]*$/.test(s);

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
