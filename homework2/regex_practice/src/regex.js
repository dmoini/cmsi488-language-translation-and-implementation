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
  return
}

function isBasicLatin1(s) {
  return
}

function isBinaryDivisibleByThirtyTwo(s) {
  return
}

function isDecimalTwoToThirtySix(s) {
  return
}

function isNonNestingMLStyle(s) {
  return
}

function isBasicLatin2(s) {
  return
}

function isBasicLatin3(s) {
  return
}
