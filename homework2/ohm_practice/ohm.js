const ohm = require("ohm-js");

const GRAMMARS = {
  CanadianPostalCode: `CanadianPostalCode {
    exp               = (firstAlpha digit goodAlpha space digit goodAlpha digit) --code
    firstAlpha        = ~badFirst upper
    goodAlpha         = ~badAlpha upper 
    badAlpha          = "D" | "F" | "I" | "O" | "Q" | "U"
    badFirst          = badAlpha | "W" | "Z"
  }`,
  
  Visa: `Visa {
    exp               = "4" lastDigits
    threeDigits       = digit digit digit
    lastDigits        = threeDigits threeDigits threeDigits threeDigits (threeDigits)?
  }`,
  
  MasterCard: `MasterCard {
    exp               = (firstDigits lastDigits)
    firstDigits       = caseA | caseB
    caseA             = ("5" "1".."5") digit digit          
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
    base 				      = ("1".."2") digit     					      --tensandTwenties
                      | "3" ("0" .. "2")       				      --thirties
                      | ("2" .. "9")							          --twotoNine
  }`,
  
  NotThreeEndingInOO: `NotThreeEndingInOO {
    exp               = overThreeString | threeString |  oneTwoStrings
    oneTwoStrings     = letter (letter)?
    threeString       = letter ~(caseInsensitive<"oo">) letter letter 
    overThreeString   = letter letter letter letter+
  }`,
  
  // TODO
  DivisibleBy32: `DivisibleBy32 {
  
  }`,
  
  TwoThroughThirtySix: `TwoThroughThirtySix {
    number            = ("1".."2") ("0" .. "9")           --tensandTwenties
                      | "3" ("0" .. "6")                  --thirties
                      | ("2" .. "9")
  }`,
  
  MLComment: `MLComment {
    comment           = "(*"  exp  "*)" 
    exp               =  exp exp                          --sentences
                      | letter+                           --words
                      | space                             --spaces
  }`,
  
  NotForFileFindNoLookAround: `NotForFileFindNoLookAround {
    exp               =  noFile                           --noFile
                      | noFor                             --noFor
                      | noFind                            --noFind
                      | other
    noFile            = "fil" ("a".."d" | "f" .. "z") | "file" letter+ | letter+ "file"
    noFor             = "fo" ("a".."q" | "s".."z") | "for" letter+ | letter+ "for"
    noFind            = "fin" ("a".."m" | "o" .. "z") | "find" letter+ | letter+ "find"
    other             = ("a".."e" | "g".."z") letter+                      --nonF
                      | "f" ("a".."h" | "j" .."n" |"p".."z")  letter+      --f
                      | "fi" ("a".."k" | "m" | "o".."z")  letter+          --fi
                      | "fo" ("a".."q" | "s".."z")  letter+                --fo
  }`,
  
  // not sure if it should accept things like files
  NotForFileFindWithLookAround: `NotForFileFindWithLookAround {
    exp               = ~(badWords) (letter)*
    badWords          = "file" | "for" | "find"
  }`
}

Object.entries(GRAMMARS).forEach(([name, grammar]) => {
  exports[`is${name}`] = (s) => ohm.grammar(grammar).match(s).succeeded();
})