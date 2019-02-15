// https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
function isCanadianPostalCode(s) {
  return /^[^DFIOQUWZdfioquwz]\d[^DFIOQUdfioqu]\s\d[^DFIOQUdfioqu]\d$/.test(s)
}

// https://www.regular-expressions.info/creditcard.html
function isLegalVisaCard(s) {
  return /^4[0-9]{12}(?:[0-9]{3}){1,2}?$/.test(s)
}

// https://www.regular-expressions.info/creditcard.html
function isLegalMasterCard(s) {
  return /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(s)
}

function isAdaNumericLiteral(s) {
  const decimal_literal = new RegExp(/[0-9_]*\.?[0-9_]+([eE][+-]?[0-9_]+)?/)
  const based_literal = new RegExp(/(([2-9]|1[0-6])#)([0-9A-F_]*\.?[0-9A-F_]+)+(#[eE][+-]?[0-9_]+)/)
  const numeric_literal = new RegExp(decimal_literal + "|" + based_literal)
  return numeric_literal.test(s)
}

// Also we should save some for Serena and Teddy
// Yeah there are three left they can split
// https://regex101.com

// Not sure about the correctness of this syntax
function isBasicLatin1(s) {
  return /^[a-zA-Z][^oO][^oO][a-zA-Z]*$/.test(s)
}

// Hey I'll do this one! -Alexia
function isBinaryDivisibleByThirtyTwo(s) {
  // make sure the last 5 digits are '00000' -Donovan
  return 
}

function isDecimalTwoToThirtySix(s) {
  return /^[2-9]|[1-2][0-9]|3[0-6]$/.test(s)
}

function isNonNestingMLStyle(s) {
  return
}

// I'll try and do this one too :) - Alexia
function isBasicLatin2(s) {
  return
}

function isBasicLatin3(s) {
  return
}


