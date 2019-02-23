// https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
function isCanadianPostalCode(s) {
  return /^[^DFIOQUWZdfioquwz]\d[^DFIOQUdfioqu]\s\d[^DFIOQUdfioqu]\d$/.test(s);
}

// https://www.regular-expressions.info/creditcard.html
function isLegalVisaCard(s) {
  return /^4[0-9]{12}(?:[0-9]{3}){1,2}?$/.test(s);
}

// https://www.regular-expressions.info/creditcard.html
function isLegalMasterCard(s) {
  return /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(s);
}

function isAdaNumericLiteral(s) {
  const decimal_literal = new RegExp(
    /^[0-9]+(\_[0-9]+)*(\.([0-9]+(\_[0-9]+)*))?([eE][+-]?[0-9]+(\_[0-9]+)*)?$/
  );
  const based_literal = new RegExp(
    /^([2-9]|1[0-6])#[0-9]+(\_[0-9A-Fa-f]+)*(\.([0-9A-Fa-f]+(\_[0-9A-Fa-f]+)*))?#([eE][+-]?[0-9]+(\_[0-9]+)*)?$/
  );
  const numeric_literal = new RegExp(decimal_literal + "|" + based_literal);
  return numeric_literal.test(s);
}

// https://regex101.com

// Checked! Works.
function isBasicLatin1(s) {
  return /^([a-nA-N]*[p-zP-Z]*)*[oO]?([a-nA-N]*[p-zP-Z]*)*$/.test(s);
}

// Checked! Works.
function isBinaryDivisibleByThirtyTwo(s) {
  return /^0{1,4}$|(1*0*)*00000$/.test(s);
}

// Checked! Works.
function isDecimalTwoToThirtySix(s) {
  return /^\b([2-9]|[12][0-9]|3[0-6])\b$/.test(s);
}

function isNonNestingMLStyle(s) {
  return /^\(\*[a-zA-Z]*\*\)$/.test(s);
}

// Works! Full expression: ^f[^io][a-zA-Z]*$|^fi[^ln][a-zA-Z]*$|^fil[^e][a-zA-Z]*$|^file[a-zA-Z]+$|^fin[^d][a-zA-Z]*$|^find[a-zA-Z]+$|^fo[^r][a-zA-Z]*$|^for[a-zA-Z]+$|^[^f]+[a-zA-Z]*$|^f$|^fo$|^fi$|^fin$|^fil$
function isBasicLatin2(s) {
  const substrings = new RegExp(/^f$|^fo$|^fi$|^fin$|^fil$/);
  const not_file = new RegExp(/^f[^io][a-zA-Z]*$|^fi[^ln][a-zA-Z]*$|^fil[^e][a-zA-Z]*$|^file[a-zA-Z]+$/);
  const not_find = new RegExp(/^fin[^d][a-zA-Z]*$|^find[a-zA-Z]+$/);
  const not_for = new RegExp(/^fo[^r][a-zA-Z]*$|^for[a-zA-Z]+$/);
  const not_start_with_f = new RegExp(/^[^f]+[a-zA-Z]*$/);
  const basic_latin = new RegExp(substrings + "|" + not_file + "|" + not_find + "|" + not_for + "|" + not_start_with_f);
  return basic_latin.test(s);
}

function isBasicLatin3(s) {
  return /\b(?:[a-eg-z]|f(?!ile\b)(?!ind\b)(?!or))\w*\b/.test(s);
}