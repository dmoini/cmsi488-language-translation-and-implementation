const ohm = require("ohm-js");

const GRAMMARS = {
  CanadianPostalCode: `CanadianPostalCode {
    exp               = firstHalf space secondHalf          --code
    firstHalf         = firstAlpha digit goodAlpha
    secondHalf        = digit goodAlpha digit
    firstAlpha        = ~badFirst upper
    goodAlpha         = ~badAlpha upper 
    badAlpha          = "D" | "F" | "I" | "O" | "Q" | "U"
    badFirst          = badAlpha | "W" | "Z"
  }`,
  
  Visa: `Visa {
    exp               = "4" lastDigits
    lastDigits        = threeDigits threeDigits threeDigits threeDigits threeDigits?
    threeDigits       = digit digit digit
  }`,
  
  MasterCard: `MasterCard {
    exp               = firstDigits lastDigits
    firstDigits       = caseA | caseB
    caseA             = "5" "1".."5" digit digit          
    caseB             = "222" digit                         --rangeOne
                      | "22" "3".."9" digit                 --rangeTwo
                      | "2" "3".."6" digit digit            --rangeThree
                      | "27" "0".."1" digit                 --rangeFour
                      | "2720"                         
    fourDigits        = digit digit digit digit
    lastDigits        = fourDigits fourDigits fourDigits 
  }`,
  
  AdaFloat: `AdaFloat {
    numlit            = exp
    exp               = baselit 
                      | declit
    declit		        = numeral ("." numeral)? exponent?
    baselit			      = base "#" basenum ("." basenum)? "#" exponent?
    exponent          = ("e" | "E") ("+" | "-")? numeral
    basenum			      = hexDigit+ ("_" hexDigit+)* 			
    numeral           = digit+ ("_" digit+)*					
    base 				      = ("1".."2") digit     					      --tensAndTwenties
                      | "3" "0".."2"       				          --thirties
                      | "2".."9"							              --twoToNine
  }`,
  
  // TODO: fix input of ""
  NotThreeEndingInOO: `NotThreeEndingInOO {
    exp               = overThreeString | threeString |  oneTwoStrings
    oneTwoStrings     = letter letter?
    threeString       = letter ~(caseInsensitive<"oo">) letter letter 
    overThreeString   = letter letter letter letter+
  }`,
  
  // TODO
  DivisibleBy32: `DivisibleBy32 {
    exp               = oneToFourZeroes 
                      | zeroOrOne* fiveZeroes               --multipleZeroes
    oneToFourZeroes   = "0" "0"? "0"? "0"?
    zeroOrOne         = "0" | "1"
    fiveZeroes        = "00000"
  }`,
  
  TwoThroughThirtySix: `TwoThroughThirtySix {
    number            = "1".."2" "0".."9"                   --tensAndTwenties
                      | "3" "0".."6"                        --thirties
                      | "2".."9"
  }`,
  
  // TODO
  MLComment: `MLComment {
    comment           = "(*"  exp  "*)" 
    exp               =  exp exp                            --sentences
                      | letter+                             --words
                      | space                               --spaces
  }`,
  
  // TODO
  NotForFileFindNoLookAround: `NotForFileFindNoLookAround {
    exp               = noFile                              --noFile
                      | noFor                               --noFor
                      | noFind                              --noFind
                      | other
    noFile            = "fil" ("a".."d" | "f" .. "z") | "file" letter+ | letter+ "file"
    noFor             = "fo" ("a".."q" | "s".."z") | "for" letter+ | letter+ "for"
    noFind            = "fin" ("a".."m" | "o" .. "z") | "find" letter+ | letter+ "find"
    other             = ("a".."e" | "g".."z") letter+                      --nonF
                      | "f" ("a".."h" | "j" .."n" |"p".."z")  letter+      --f
                      | "fi" ("a".."k" | "m" | "o".."z")  letter+          --fi
                      | "fo" ("a".."q" | "s".."z")  letter+                --fo
  }`,
  
  // TODO
  // not sure if it should accept things like files
  NotForFileFindWithLookAround: `NotForFileFindWithLookAround {
    exp               = ~badWords letter*
    badWords          = "file" | "for" | "find"
  }`
}

Object.entries(GRAMMARS).forEach(([name, grammar]) => {
  exports[`is${name}`] = (s) => ohm.grammar(grammar).match(s).succeeded();
})